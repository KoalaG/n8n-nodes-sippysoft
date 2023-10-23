import type { INodeProperties } from 'n8n-workflow';

import * as getCustomerInfo from './getCustomerInfo';
import * as listCustomers from './listCustomers';

export { getCustomerInfo, listCustomers };

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
			{
				name: 'List Customers',
				value: 'listCustomers',
				description: 'Get a list of customers',
				action: 'Get a list of customers',
			},
		],
		default: 'listCustomers',
	},
	...getCustomerInfo.description,
	...listCustomers.description,

];
