import { INodeProperties } from "n8n-workflow";

export default function delegated_to(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'Assigned Customer ID',
		description: 'The internal ID of the customer record is delegated to',
		name: 'delegated_to',
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
