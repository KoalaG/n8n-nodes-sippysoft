import { INodeProperties } from "n8n-workflow";

export default function did(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'DID Number',
		description: 'The canonic E.164 number that is used by the system for billing and accounting purposes',
		name: 'did',
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
