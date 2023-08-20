import * as getAccountCDRs from './getAccountCDRs';
import * as getCustomerCDRs from './getCustomerCDRs';

import type { INodeProperties } from 'n8n-workflow';

export { getAccountCDRs, getCustomerCDRs };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cdr'],
			},
		},
		options: [
			{
				name: 'Get Account CDRs',
				value: 'getAccountCDRs',
				description: 'Get and filter CDRs for accounts',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Get CDRs for accounts',
			},
			{
				name: 'Get Customer CDRs',
				value: 'getCustomerCDRs',
				description: 'Get and filter CDRs for customers',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: 'Get CDRs for customers',
			},
		],
		default: 'getAccountCDRs',
	},

	...getAccountCDRs.description,
	...getCustomerCDRs.description,

];
