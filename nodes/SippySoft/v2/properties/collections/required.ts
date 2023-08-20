import { INodeProperties } from "n8n-workflow";
import { ICollectionOption, ICollectionOverrides } from "../IOverrides.type";

export default function requiredCollection(
	operation: string,
	parameters: ICollectionOption[],
	overrides?: ICollectionOverrides,
) : INodeProperties {
	return {
		displayName: overrides?.displayName || 'Parameters',
		name: overrides?.name || 'required',
		default: {},
		...overrides,
		type: 'fixedCollection',
		displayOptions: {
			show: {
				operation: [ operation ],
			},
		},
		options: parameters.map((parameter) => ({
			...parameter,
			displayOptions: undefined,
			required: true,
		}))
	}
}
