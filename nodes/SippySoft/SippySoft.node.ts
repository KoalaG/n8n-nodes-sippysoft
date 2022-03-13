import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions
} from 'n8n-workflow';
import { serializeMethodCall, Deserializer } from '@foxglove/xmlrpc';
import AxiosDigestAuth from '@koush/axios-digest-auth';
import { PaginatedMethods } from './displayrules';
import * as SippyParams from './SippyParams';

function formatDate(date: string) : string {
	const d = new Date(date);
	const HH    = d.getUTCHours().toString().padStart(2,'0');
	const mm    = d.getUTCMinutes().toString().padStart(2,'0');
	const ss    = d.getUTCSeconds().toString().padStart(2,'0');
	const ddd   = d.toLocaleDateString('utc', { weekday: 'short' });
	const MMM   = d.toLocaleDateString('utc', { month: 'short' });
	const DD    = d.getUTCDate().toString().padStart(2,'0');
	const YYYY  = d.getUTCFullYear();
	return `${HH}:${mm}:${ss}.000 GMT ${ddd} ${MMM} ${DD} ${YYYY}`;
}

export class SippySoft implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SippySoft API',
		name: 'sippySoft',
		group: ['communication'],
		version: 1,
		description: 'Consume SippySoft API',
		subtitle: '={{$parameter["methodCall"] + ": " + $parameter["sippyDomain"]}}',
		defaults: {
			name: 'SippySoft',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'httpDigestAuth',
				required: true,
			},
		],

		properties: [
			
			{
				displayName: 'SippySoft Server',
				name: 'sippyDomain',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'my.sippy.server',
				description: 'The domain name of your sippy server.',
			},

			{
				displayName: 'Resource',
				name: 'callResource',
				type: 'options',
				required: true,
				default: '',
				options: [
					{ name: 'CDR',		value: 'cdr'		},
					{ name: 'Account',	value: 'account'	},
					{ name: 'Customer',	value: 'customer'	},
					{ name: 'Misc',		value: 'misc'	},
				]
			},

			{
				displayName: 'Method Call',
				name: 'methodCall',
				type: 'options',
				required: true,
				default: '',
				typeOptions: {
					loadOptionsDependsOn: [ 'callAction', 'callResource' ],
					loadOptionsMethod: 'loadMethods',
				},
				placeholder: 'Select Method Call',
				description: 'The method to call on the Sippy API',
			},

			{
				displayName: 'Pagination',
				name: 'parsPaginations',
				type: 'collection',
				placeholder: 'Add Pagination Parameter',
				default: {},
				displayOptions: { show: { '/methodCall': PaginatedMethods } },
				options: [
					SippyParams.offset,
					SippyParams.limit,
				]
			},	

			{
				displayName: 'Resource Parameter',
				name: 'parsResource',
				type: 'collection',
				placeholder: 'Add Resource Parameter',
				default: {},
				displayOptions: { show: { '/methodCall': [
					'getAccountCDRs', 'getAccountInfo', 'blockAccount', 'unblockAccount',
				] } },
				options: [
					SippyParams.i_account,
					SippyParams.i_cdr,
				]
			},

			{
				displayName: 'CDR Parameters',
				name: 'parsCDR',
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

			{
				displayName: 'Other Parameters',
				name: 'parsMisc',
				type: 'collection',
				placeholder: 'Add Other Parameter',
				default: {},
				displayOptions: { show: { '/methodCall': [
					'getDictionary',
				]}},
				options: [
					SippyParams.name.dictionary,
					SippyParams.type.dictionary,
				]
			}

		],
	};

	methods = {
		loadOptions: {
			async loadMethods(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const callResource = this.getCurrentNodeParameter('callResource') as string;
				
				const methods = [
					{ name: 'Get Account CDRs',		value: 'getAccountCDRs',	f: [ 'cdr', 'account',						] },
					{ name: 'Get Customer CDRs',	value: 'getCustomerCDRs',	f: [ 'cdr', 			'customer',			] },
					{ name: 'List Accounts',		value: 'listAccounts',		f: [ 		'account',						] },
					{ name: 'Get Account Info',		value: 'getAccountInfo',	f: [ 		'account',						] },
					{ name: 'Block Account',		value: 'blockAccount',		f: [ 		'account',						] },
					{ name: 'Unblock Account',		value: 'unblockAccount',	f: [ 		'account',						] },
					{ name: 'Get Dictionary',		value: 'getDictionary',		f: [								'misc',	] },
				];
				
				return methods
					.filter(({f}) => f.includes(callResource))
					.sort(function(a, b) {
						var textA = a.name.toUpperCase();
						var textB = b.name.toUpperCase();
						return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
					})
					.map(({ name, value }) => ({ name, value }));

			},
		}
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();

		let item: INodeExecutionData;
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			item = items[itemIndex];

			// Retrieve required paramaters
			const sippyDomain = this.getNodeParameter('sippyDomain', itemIndex) as string;
			const httpDigestAuth = await this.getCredentials('httpDigestAuth') as { user: string, password: string };
			const methodCall = this.getNodeParameter('methodCall', itemIndex, '') as string;
			
			const parsPaginations = this.getNodeParameter('parsPaginations', itemIndex, {}) as {
				offset?: number,
				limit?: number,
			};

			const parsResource = this.getNodeParameter('parsResource', itemIndex, {}) as {
				i_account?: number,
				i_customer?: number,
				i_cdr?: string,
			};

			const parsCDR = this.getNodeParameter('parsCDR', itemIndex, {}) as {
				start_date?: any,
				end_date?: any,
			};
			
			const parsGeneral = this.getNodeParameter('parsGeneral', itemIndex, {}) as {};

			// Format specific parameter values
			if (parsCDR.start_date) {
				parsCDR.start_date = formatDate(parsCDR.start_date);
			}
			if (parsCDR.end_date) {
				parsCDR.end_date = formatDate(parsCDR.end_date);
			}

			// Generate XML String
			const xmlString = serializeMethodCall(methodCall, [ {
				...parsPaginations,
				...parsResource,
				...parsCDR,
				...parsGeneral,
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
			const resp = (await dexml.deserializeMethodResponse(rawResponse.data)) as object;

			// Replace item with response
			item.json = { ...resp };
			
		}

		return this.prepareOutputData(items);

	}

}
