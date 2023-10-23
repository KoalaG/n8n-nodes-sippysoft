/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import type { INodeTypeDescription } from 'n8n-workflow';
import * as account from './account';
import * as cdr from './cdr';
import * as did from './did';
import * as customer from './customer';
//import * as misc from './misc';
//import * as tarrif from './tarrif';

export const versionDescription: INodeTypeDescription = {
	displayName: 'Sippysoft',
	name: 'sippysoft',
	//icon: 'file:mattermost.svg',
	group: [],
	version: 2,
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	description: 'Consume Sippysoft API',
	defaults: {
		name: 'Sippysoft',
	},
	inputs: ['main'],
	outputs: ['main'],
	credentials: [
		{
			name: 'sippysoftApi',
			required: true,
		},
	],

	properties: [

		// Resource
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			options: [
				{ name: 'Account',	value: 'account'	},
				{ name: 'CDR',			value: 'cdr'		},
				{ name: 'Customer',	value: 'customer'	},
				{ name: 'DID',   		value: 'did'		},
				{ name: 'Misc',			value: 'misc'		},
				{ name: 'Tariff',   value: 'tariff'		},
			],
			default: 'account',
			noDataExpression: true,
			required: true,
			description: 'Create a new contact',
		},

		...account.descriptions,
		...cdr.descriptions,
		...customer.descriptions,
		...did.descriptions,
		//...misc.descriptions,
		//...tariff.descriptions,

	],
};
