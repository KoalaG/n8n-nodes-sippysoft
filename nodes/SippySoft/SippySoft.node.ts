
import {
    IDataObject,
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeExecutionWithMetadata,
} from 'n8n-workflow';

import {
    OptionsWithUri,
} from 'request';

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
                    { name: 'CDR',      value: 'cdr', },
                ],
                default: 'contact',
                noDataExpression: true,
                required: true,
                description: 'Create a new contact',
            },

        ]
    }

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {

        // Handle data coming from previous nodes
        const items = this.getInputData();
        let responseData;
        const returnData: any[] = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        // For each item, make an API call to create a contact
        for (let i = 0; i < items.length; i++) {
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
