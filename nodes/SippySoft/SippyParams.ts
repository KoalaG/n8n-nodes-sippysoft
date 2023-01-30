
import { /*INodePropertyOptions,*/ INodeProperties, /*INode*/ } from "n8n-workflow"
import { /*Interface*/ } from "readline"

export const offset: INodeProperties = {
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	default: 0,
}

export const limit: INodeProperties = {
	displayName: 'Limit',
	description: 'Max number of results to return',
	name: 'limit',
	type: 'number',
	typeOptions: {
		minValue: 1,
	},
	default: 50,
}

export const i_account: INodeProperties = {
	displayName: 'Account',
	name: 'i_account',
	type: 'number',
	default: '',
	displayOptions: { show: { '/operation': [
		'getAccountCDRs', 'getAccountInfo', 'blockAccount', 'unblockAccount',
		'getDIDsList',
	] } }
}

export const i_customer: INodeProperties = {
	displayName: 'Customer',
	name: 'i_customer',
	type: 'number',
	default: '',
	displayOptions: { show: { '/operation': [
		'getCustomerCDRs', 'getCustomerInfo'
	] } }
}

export const i_call: INodeProperties = {
	displayName: 'Call',
	name: 'i_call',
	type: 'number',
	default: '',
	displayOptions: { show: { '/operation': [
		'getCDRSDP'
	] } }
}

export const i_cdr: INodeProperties = {
	displayName: 'CDR ID',
	name: 'i_cdr',
	type: 'string',
	default: '',
	displayOptions: { show: { '/operation': [
		'getAccountCDRs',
	] } }
}

export const start_date: INodeProperties = {
	displayName: 'Start Date',
	name: 'start_date',
	type: 'dateTime',
	default: '',
	displayOptions: {
		show: {
			'/operation': [
				'getAccountCDRs',
			]
		}
	}
}

export const end_date: INodeProperties = {
	displayName: 'End Date',
	name: 'end_date',
	type: 'dateTime',
	default: '',
	displayOptions: {
		show: {
			'/operation': [
				'getAccountCDRs',
			]
		}
	}
}

export const cli: INodeProperties = {
	displayName: 'CLI',
	name: 'cli',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			'/operation': [
				'getAccountCDRs',
			]
		}
	}
}

export const cld: INodeProperties = {
	displayName: 'CLD',
	name: 'cld',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			'/operation': [
				'getAccountCDRs',
			]
		}
	}
}

interface Type {
	cdr: INodeProperties,
	dictionary: INodeProperties,
}
export const type: Type = {

	cdr: {
		displayName: 'Type',
		name: 'type',
		type: 'options',
		default: 'non_zero',
		displayOptions: {
			show: {
				'/operation': [
					'getAccountCDRs',
				]
			}
		},

		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Complete', value: 'complete' },
			{ name: 'Errors', value: 'errors' },
			{ name: 'Incomplete', value: 'incomplete' },
			{ name: 'Non-Zero', value: 'non_zero' },
			{ name: 'Non-Zero & Errors', value: 'non_zero_and_errors' },
		]
	},

	dictionary: {
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		default: 'web',
		displayOptions: { show: {
			'/operation': [ 'getDictionary' ],
			'name': [ 'languages' ],
		} },
		options: [
			{ name: 'Web', value: 'web' },
			{ name: 'IVR', value: 'ivr' },
		]
	}

}

interface Name {
    dictionary: INodeProperties,
}
export const name: Name = {

	dictionary: {
		displayName: 'Dictionary Name',
		name: 'name',
		type: 'options',
		required: true,
		default: 'ca_list_types',
		displayOptions: { show: { '/operation': [
			'getDictionary'
		] } },
		options: [
			{ name: 'CA List Types',                value: 'ca_list_types',         },
			{ name: 'Currecies',                    value: 'currencies',            },
			{ name: 'Export Types',                 value: 'export_types',          },
			{ name: 'Forward DID Modes',            value: 'forward_did_modes',     },
			{ name: 'Languages',                    value: 'languages',             description: 'Returns the list of defined languages. Requires an additional parameter "type".'   },
			{ name: 'Media Relay Types',            value: 'media_relay_types',     },
			{ name: 'Media Relays',                 value: 'media_relays',          },
			{ name: 'Privacy Modes',                value: 'privacy_modes',         },
			{ name: 'Protocol Transports',          value: 'proto_transports',      },
			{ name: 'Protocols',                    value: 'protocols',             },
			{ name: 'Quality Monitoring Actions',   value: 'qmon_actions',          },
			{ name: 'SSL Certificate Types',        value: 'ssl_certificate_types',	},
			{ name: 'Tariff Types',                 value: 'tariff_types',          },
			{ name: 'Timezones',                    value: 'timezones',             },
			{ name: 'Upload Types',                 value: 'upload_types',          },
		]
	}

}

export const name_pattern: INodeProperties = {
	displayName: 'Name Pattern',
	name: 'name_pattern',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			'/operation': [
				'getTariffsList',
			]
		}
	}
}


export const did : INodeProperties = {
	displayName: 'DID Number',
	name: 'did',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			'/operation': [
				'addDID', 'getDIDsList',
			]
		}
	}
}

export const incoming_did : INodeProperties = {
    displayName: 'Incoming DID Number',
    name: 'incoming_did',
    type: 'string',
    default: '',
    displayOptions: { show: { '/operation': [
        'addDID', 'updateDID', 'getDIDsList',
    ] } }
}

export const delegated_to: INodeProperties = {
    displayName: 'Delegated To',
    name: 'delegated_to',
    type: 'number',
    default: '',
    displayOptions: { show: { '/operation': [
        'getDIDsList',
    ] } }
}
export const i_ivr_application: INodeProperties = {
    displayName: 'IVR Application',
    name: 'i_ivr_application',
    type: 'number',
    default: '',
    displayOptions: { show: { '/operation': [
        'getDIDsList',
    ] } },
}
export const not_assigned: INodeProperties = {
    displayName: 'Not Assigned',
    name: 'not_assigned',
    type: 'boolean',
    default: true,
    displayOptions: { show: { '/operation': [
        'getDIDsList',
    ] } },
}
