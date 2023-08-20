import { INodeProperties } from "n8n-workflow";

export type PaginationProperties = {
	offset?: number;
	limit?: number;
}

export default function pagination(operation: string) : INodeProperties {
	return {
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Pagination Parameter',
		default: {},
		displayOptions: {
			show: {
				operation: [ operation ],
			},
		},
		options: [

			{
				displayName: 'Offset',
				description: 'The offset of the first record to return',
				name: 'offset',
				type: 'number',
				default: 0,
			},

			{
				displayName: 'Limit',
				description: 'Max number of results to return',
				name: 'limit',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
				},
			},
		]
	}
}
