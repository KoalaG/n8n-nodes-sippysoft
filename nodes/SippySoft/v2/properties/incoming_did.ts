import { INodeProperties } from "n8n-workflow";

export default function incoming_did(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'Incoming DID Number',
		description: 'This is the number as it comes from the DID gateway or DID provider',
		name: 'incoming_did',
		type: 'string',
		default: '',
		required,
		displayOptions: {
			show: {
				operation: [ operation ],
			},
		},
	}
}
