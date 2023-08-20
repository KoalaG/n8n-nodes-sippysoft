import * as getDIDsList from './getDIDsList';

import type { INodeProperties } from 'n8n-workflow';

export { getDIDsList };

export const descriptions: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['did'],
			},
		},
		options: [
			{
				name: 'Get DIDs List',
				value: 'getDIDsList',
				description: 'List DIDs',
				action: 'List dids',
			},
		],
		default: 'getDIDsList',
	},

	...getDIDsList.description,

];
