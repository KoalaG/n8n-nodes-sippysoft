import { INodeProperties } from "n8n-workflow";

export type PaginationProperties = {
	offset?: number;
	limit?: number;
}

export default function optionalCollection(
	operation: string,
	properties: Partial<Omit<INodeProperties, 'options'>>,
	options: INodeProperties[]
	) : INodeProperties {
	return {
		displayName: properties.displayName || 'Parameters',
		name: properties.name || 'optional',
		...properties,
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				operation: [ operation ],
			},
		},
		options: options.map((option) => ({
			...option,
			displayOptions: undefined,
		}))
	}
}
