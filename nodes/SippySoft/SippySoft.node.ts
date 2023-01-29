
import {
    IDataObject,
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

export class SippySoft implements INodeType {

    description: INodeTypeDescription = {
        displayName: 'SippySoft',
        name: 'sippysoft',
        // icon
        group: [],
        version: 1,
        description: "Consume SippySoft API",
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
            }
        ],
        properties: [

            {
                displayName: 'SippySoft Server',
                name: 'sippyDomain',
                type: 'string',
                required: true,
                default: '',
                placeholder: 'my.sippy.server',
                description: 'The domain name of your SippySoft server',
            },

            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
									{ name: 'CDR',		value: 'cdr'		},
									{ name: 'Account',	value: 'account'	},
									{ name: 'Customer',	value: 'customer'	},
									{ name: 'Tariff',   value: 'tariff'		},
									{ name: 'Misc',		value: 'misc'		},
                ],
                default: '',
                noDataExpression: true,
                required: true,
                description: 'Create a new contact',
            },

						{
							displayName: 'Operation',
							name: 'operation',
							type: 'options',
							required: true,
							default: '',
							typeOptions: {
								loadOptionsDependsOn: [ 'resource' ],
								loadOptionsMethod: 'loadOperations',
							},
							placeholder: 'Select Method Call',
							description: 'The method to call on the Sippy API',
						},

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

			let responseData;
			const returnData: any[] = [];

			// For each item, make an API call to create a contact
			for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {

					const sippyDomain = this.getNodeParameter('sippyDomain', itemIndex) as string;
					const httpDigestAuth = await this.getCredentials('httpDigestAuth') as { user: string, password: string };
					const operation = this.getNodeParameter('operation', itemIndex, '') as string;

            if (resource === 'contact') {
                if (operation === 'create') {
                    // Get email input
                    const email = this.getNodeParameter('email', i) as string;
                    // Get additional fields input
                    const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                    const data: IDataObject = {
                        email,
                    };

                    Object.assign(data, additionalFields);

                    // Make HTTP request according to https://sendgrid.com/docs/api-reference/
                    const options: OptionsWithUri = {
                        headers: {
                            'Accept': 'application/json',
                        },
                        method: 'PUT',
                        body: {
                            contacts: [
                                data,
                            ],
                        },
                        uri: `https://api.sendgrid.com/v3/marketing/contacts`,
                        json: true,
                    };
                    responseData = await this.helpers.requestWithAuthentication.call(this, 'friendGridApi', options);
                    returnData.push(responseData);
                }
            }
        }
        // Map data to n8n data structure
        return [this.helpers.returnJsonArray(returnData)];

    }

}
