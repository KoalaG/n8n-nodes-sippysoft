import { INodeProperties } from "n8n-workflow";

export default function i_ivr_application(operation: string, required = false) : INodeProperties {
	return {
		displayName: 'IVR Application ID',
		description: 'The internal ID of the IVR application',
		name: 'i_ivr_application',
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
