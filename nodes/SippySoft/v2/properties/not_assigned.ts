import { INodeProperties } from "n8n-workflow";

export default function not_assigned(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'Not Assigned',
		description: 'Whether the DID is assigned to an account',
		name: 'not_assigned',
		type: 'boolean',
		default: true,
		required,
		displayOptions: {
			show: {
				operation: [ operation ],
			},
		},
	}
}
