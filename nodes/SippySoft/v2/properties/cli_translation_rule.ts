import { INodeProperties } from "n8n-workflow";

export default function cli_translation_rule(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'CLI Translation Rule',
		description: 'Translation rule applied to CLI',
		name: 'cli_translation_rule',
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
