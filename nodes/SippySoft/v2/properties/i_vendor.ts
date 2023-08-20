import { INodeProperties } from "n8n-workflow";

export default function i_vendor(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'Vendor ID',
		description: 'The internal ID of the vendor',
		name: 'i_vendor',
		type: 'number',
		default: null,
		required,
		displayOptions: {
			show: {
				operation: [ operation ],
			},
		},
	}
}
