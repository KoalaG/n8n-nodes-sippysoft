import { INodeProperties } from "n8n-workflow";
import { ICollectionOption, ICollectionOverrides } from "../IOverrides.type";

export type PaginationProperties = {
	offset?: number;
	limit?: number;
}

export default function optionalCollection(
	operation: string,
	parameters: ICollectionOption[],
	overrides?: ICollectionOverrides,
) : INodeProperties {
	return {
		displayName: overrides?.displayName || 'More Parameters',
		name: overrides?.name || 'optional',
		default: {},
		...overrides,
		type: 'collection',
		displayOptions: {
			show: {
				operation: [ operation ],
			},
		},
		options: parameters.map((parameter) => ({
			...parameter,
			displayOptions: undefined,
			required: false,
		}))
	}
}
