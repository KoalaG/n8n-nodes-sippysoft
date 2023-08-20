import { INodeProperties } from "n8n-workflow";

export default function i_connection(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'Connection ID',
		description: 'The internal ID of the connection',
		name: 'i_connection',
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
