import { INodeProperties } from "n8n-workflow";

export default function description(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'Description',
		description: 'Description of record',
		name: 'description',
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
