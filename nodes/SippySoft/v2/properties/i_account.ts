import { INodeProperties } from "n8n-workflow";

export default function i_account(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'Account ID',
		description: 'The internal ID of the account',
		name: 'i_account',
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
