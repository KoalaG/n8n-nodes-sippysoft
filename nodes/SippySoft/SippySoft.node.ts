
import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeExecutionWithMetadata,
		ILoadOptionsFunctions,
		INodePropertyOptions
} from 'n8n-workflow';

import { serializeMethodCall, Deserializer } from '@foxglove/xmlrpc';
import AxiosDigestAuth from '@koush/axios-digest-auth';

import { paginatedMethods } from './displayrules';
import * as SippyParams from './SippyParams';

import { formatDate } from './functions/formatDate';

export class Sippysoft implements INodeType {

    description: INodeTypeDescription = {
			displayName: 'SippySoft',
			name: 'sippysoft',
			group: [],
			version: 1,
			description: "Consume SippySoft API",
			defaults: {
				name: 'SippySoft',
			},

			inputs: ['main'],
			outputs: ['main'],

			credentials: [
				{
					name: 'httpDigestAuthApi',
					required: true,
				}
			],

			properties: [

				// Server
				{
					displayName: 'SippySoft Server',
					name: 'sippyDomain',
					type: 'string',
					required: true,
					default: '',
					placeholder: 'my.sippy.server',
					description: 'The domain name of your SippySoft server',
				},

				// Resource
				{
					displayName: 'Resource',
					name: 'resource',
					type: 'options',
					options: [
						{ name: 'Account',	value: 'account'	},
						{ name: 'CDR',			value: 'cdr'		},
						{ name: 'Customer',	value: 'customer'	},
						{ name: 'Misc',			value: 'misc'		},
						{ name: 'Tariff',   value: 'tariff'		},
					],
					default: 'account',
					noDataExpression: true,
					required: true,
					description: 'Create a new contact',
				},

				// Operation
				{
					displayName: 'Operation Name or ID',
					name: 'operation',
					type: 'options',
					required: true,
					default: '',
					typeOptions: {
						loadOptionsDependsOn: [ 'resource' ],
						loadOptionsMethod: 'loadOperations',
					},
					noDataExpression: true,
					placeholder: 'Select Method Call',
					description: 'Choose from the list. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
				},

				// Params: Pagination
				{
					displayName: 'Pagination',
					name: 'paramsPaginations',
					type: 'collection',
					placeholder: 'Add Pagination Parameter',
					default: {},
					displayOptions: { show: { '/resource': paginatedMethods } },
					options: [
						SippyParams.offset,
						SippyParams.limit,
					]
				},

				// Params: CDR
				{
					displayName: 'CDR Parameters',
					name: 'paramsCDR',
					type: 'collection',
					placeholder: 'Add CDR Parameter',
					default: {},
					displayOptions: { show: { '/methodCall': [ 'getAccountCDRs', ] } },
					options: [
						SippyParams.start_date,
						SippyParams.end_date,
						SippyParams.cli,
						SippyParams.cld,
						SippyParams.type.cdr,
					]
				},

				// Params: DID
				{
					displayName: 'DID Parameters',
					name: 'paramsDID',
					type: 'collection',
					placeholder: 'Add DID Parameter',
					default: {},
					displayOptions: { show: { '/methodCall': [ 'getDIDsList', ] } },
					options: [
						SippyParams.did,
						SippyParams.incoming_did,
						SippyParams.delegated_to,
						SippyParams.i_account,
						SippyParams.i_ivr_application,
						SippyParams.not_assigned
					]
				},

				// Params: Other
				{
					displayName: 'Other Parameters',
					name: 'paramsMisc',
					type: 'collection',
					placeholder: 'Add Other Parameter',
					default: {},
					displayOptions: { show: { '/methodCall': [
						'getDictionary', 'getTariffsList',
					]}},
					options: [
						SippyParams.name.dictionary,
						SippyParams.type.dictionary,
						SippyParams.name_pattern,
					]
				}

			]
    }

		methods = {
			loadOptions: {

				async loadOperations(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
					const callResource = this.getCurrentNodeParameter('resource') as string;

					const operations = [
						{ name: 'Get CDR SDP',				value: 'getCDRSDP',				resources: [ 'cdr',																						] },
						{ name: 'Get Account CDRs',		value: 'getAccountCDRs',	resources: [ 'cdr', 'account',																] },
						{ name: 'List Accounts',			value: 'listAccounts',		resources: [ 				'account',																] },
						{ name: 'Get Account Info',		value: 'getAccountInfo',	resources: [ 				'account',																] },
						{ name: 'Block Account',			value: 'blockAccount',		resources: [ 				'account',																] },
						{ name: 'Unblock Account',		value: 'unblockAccount',	resources: [ 				'account',																] },
						{ name: 'Get Customer CDRs',	value: 'getCustomerCDRs',	resources: [ 'cdr', 						'customer',										] },
						{ name: 'List Tariffs',				value: 'getTariffsList',	resources: [ 																'tariff',					] },
						{ name: 'Get Dictionary',			value: 'getDictionary',		resources: [																					'misc',	] },
					];

					return operations
						.filter(({resources}) => resources.includes(callResource))
						.sort(function(a, b) {
							var textA = a.name.toUpperCase();
							var textB = b.name.toUpperCase();
							return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
						})
						.map(({ name, value }) => ({ name, value }));

				},

			}
		}

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {

			// Handle data coming from previous nodes
			const items = this.getInputData();
			const returnData: any[] = [];

			// For each item, make an API call to create a contact
			for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {

					const sippyDomain = this.getNodeParameter('sippyDomain', itemIndex) as string;
					const httpDigestAuth = await this.getCredentials('httpDigestAuth') as { user: string, password: string };
					const operation = this.getNodeParameter('operation', itemIndex, '') as string;

					// Get Paramaters
					const paramsPaginations: any = this.getNodeParameter('paramsPaginations', itemIndex, {});
					const paramsResource: any = this.getNodeParameter('paramsResource', itemIndex, {});
					const paramsCDR: any = this.getNodeParameter('paramsCDR', itemIndex, {});
					const paramsDID: any = this.getNodeParameter('paramsDID', itemIndex, {});
					const paramsMisc: any = this.getNodeParameter('paramsMisc', itemIndex, {});

					// Format specific parameter values
					if (paramsCDR.start_date) {
						paramsCDR.start_date = formatDate(paramsCDR.start_date);
					}
					if (paramsCDR.end_date) {
						paramsCDR.end_date = formatDate(paramsCDR.end_date);
					}

					// Generate XML String
					const xmlString = serializeMethodCall(operation, [ {
						...paramsPaginations,
						...paramsResource,
						...paramsCDR,
						...paramsDID,
						...paramsMisc,
					} ]);

					// Setup Authentication
					const digestAuth = new AxiosDigestAuth({
						username: httpDigestAuth.user as string,
						password: httpDigestAuth.password as string,
					});

					// Make Call
					const rawResponse = await digestAuth.request({
						url: `https://${sippyDomain}/xmlapi/xmlapi`,
						headers: {
							Accept: "application/xml",
							"Content-Type": "application/xml"
						},
						method: "POST",
						data: xmlString,
					});

					// Deserialise response
					const dexml = new Deserializer();
					const responseData = (await dexml.deserializeMethodResponse(rawResponse.data));

					returnData.push(responseData);
        }

        // Map data to n8n data structure
        return [this.helpers.returnJsonArray(returnData)];

    }

}
