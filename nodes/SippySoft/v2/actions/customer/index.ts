import type { INodeProperties } from 'n8n-workflow';

import * as getCustomerInfo from './getCustomerInfo';

export { getCustomerInfo };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Get Customer Info',
				value: 'getCustomerInfo',
				description: 'Get info for a customer',
				action: 'Get info for a customer',
			},
		],
		default: 'getCustomerInfo',
	},
	...getCustomerInfo.description,

];
