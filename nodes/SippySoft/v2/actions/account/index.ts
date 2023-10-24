import type { INodeProperties } from 'n8n-workflow';

import * as getRegistrationStatus from './getRegistrationStatus';
import * as listAccounts from './listAccounts';
import * as accountCredit from './accountCredit';
import * as getAccountInfo from './getAccountInfo';
import * as updateAccount from './updateAccount';

export { getRegistrationStatus, listAccounts, accountCredit, getAccountInfo, updateAccount };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Add Account Credit',
				value: 'accountCredit',
				description: 'Add credit to an account',
				action: 'Add credit to an account',
			},
			{
				name: 'Get Account Info',
				value: 'getAccountInfo',
				description: 'Get info for an account',
				action: 'Get info for an account',
			},
			{
				name: 'Get Account Info By Username',
				value: 'getAccountInfoByUsername',
				description: 'Get info for an account using username',
				action: 'Get info for an account using username',
			},
			{
				name: 'Get Registration Status',
				value: 'getRegistrationStatus',
				description: 'Get the registration status of an account',
				action: 'Get registration status of an account',
			},
			{
				name: 'List Accounts',
				value: 'listAccounts',
				description: 'List all accounts',
				action: 'List all accounts',
			},
			{
				name: 'Update Account',
				value: 'updateAccount',
				description: 'Update an account',
				action: 'Update an account',
			}
		],
		default: 'listAccounts',
	},
	...getRegistrationStatus.description,
	...listAccounts.description,
	...accountCredit.description,
	...getAccountInfo.description,
	...updateAccount.description,
];
