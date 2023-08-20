import { INodeProperties } from "n8n-workflow";
import { ICollectionOption } from "../IOverrides.type";

export default function required(
	operation: string,
	parameters: ICollectionOption[],
) : INodeProperties[] {
	return parameters.map((parameter) => ({
		...parameter,
		displayOptions: {
			show: {
				operation: [ operation ],
			},
		},
		required: true,
	}));
}
