import { INodeProperties } from "n8n-workflow";

export default function translation_rule(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'Translation Rule',
		description: 'Translation rule applied to DID',
		name: 'translation_rule',
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
