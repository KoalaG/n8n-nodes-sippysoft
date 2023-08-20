import { INodeProperties } from "n8n-workflow";

export default function i_did(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'DID ID',
		description: 'The internal ID of the DID',
		name: 'i_did',
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
