
import { INodePropertyOptions, INodeProperties, INode } from "n8n-workflow"
import { Interface } from "readline"

export const offset: INodeProperties = {
    displayName: 'Offset',
    name: 'offset',
    type: 'number',
    required: false,
    default: 0,
}

export const limit: INodeProperties = {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    required: false,
    default: 10,
}

export const i_account: INodeProperties = {
    displayName: 'Account',
    name: 'i_account',
    type: 'number',
    required: false,
    default: '',
    displayOptions: { show: { '/methodCall': [
        'getAccountCDRs', 'getAccountInfo', 'blockAccount', 'unblockAccount'
    ] } }
}

export const i_call: INodeProperties = {
    displayName: 'Call',
    name: 'i_call',
    type: 'number',
    required: false,
    default: '',
    displayOptions: { show: { '/methodCall': [
        'getCDRSDP'
    ] } }
}

export const i_cdr: INodeProperties = {
    displayName: 'CDR ID',
    name: 'i_cdr',
    type: 'string',
    required: false,
    default: '',
    displayOptions: { show: { '/methodCall': [
        'getAccountCDRs',
    ] } }
}

export const start_date: INodeProperties = {
    displayName: 'Start Date',
    name: 'start_date',
    type: 'dateTime',
    required: false,
    default: '',
    displayOptions: {
        show: {
            '/methodCall': [
                'getAccountCDRs',
            ]
        }
    }
}

export const end_date: INodeProperties = {
    displayName: 'End Date',
    name: 'end_date',
    type: 'dateTime',
    required: false,
    default: '',
    displayOptions: {
        show: {
            '/methodCall': [
                'getAccountCDRs',
            ]
        }
    }
}

export const cli: INodeProperties = {
    displayName: 'CLI',
    name: 'cli',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
        show: {
            '/methodCall': [
                'getAccountCDRs',
            ]
        }
    }
}

export const cld: INodeProperties = {
    displayName: 'CLD',
    name: 'cld',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
        show: {
            '/methodCall': [
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
        required: true,
        default: '',
        displayOptions: {
            show: {
                '/methodCall': [
                    'getAccountCDRs',
                ]
            }
        },
        options: [
            { name: 'Non-Zero & Errors', value: 'non_zero_and_errors' },
            { name: 'Non-Zero', value: 'non_zero' },
            { name: 'All', value: 'all' },
            { name: 'Complete', value: 'complete' },
            { name: 'Incomplete', value: 'incomplete' },
            { name: 'Errors', value: 'errors' },
        ]
    },

    dictionary: {
        displayName: 'Type',
        name: 'type',
        type: 'options',
        required: true,
        default: 'web',
        displayOptions: { show: {
            '/methodCall': [ 'getDictionary' ],
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
        default: '',
        displayOptions: { show: { '/methodCall': [
            'getDictionary'
        ] } },
        options: [
            { name: 'Languages',                    value: 'languages',             description: 'returns the list of defined languages. Requires an additional parameter "type"'   },
            { name: 'Export Types',                 value: 'export_types',          description: '', },
            { name: 'Currecies',                    value: 'currencies',             },
            { name: 'Timezones',                    value: 'timezones',              },
            { name: 'Media Relay Types',            value: 'media_relay_types',      },
            { name: 'Media Relays',                 value: 'media_relays',           },
            { name: 'Protocols',                    value: 'protocols',              },
            { name: 'Protocol Transports',          value: 'proto_transports',       },
            { name: 'Quality Monitoring Actions',   value: 'qmon_actions',           },
            { name: 'Forward DID Modes',            value: 'forward_did_modes',      },
            { name: 'Upload Types',                 value: 'upload_types',           },
            { name: 'Privacy Modes',                value: 'privacy_modes',          },
            { name: 'Tariff Types',                 value: 'tariff_types',           },
            { name: 'SSL Certificate Types',        value: 'ssl_certificate_types',  },
            { name: 'CA List Types',                value: 'ca_list_types',          },
        ]
    }

}

export const name_pattern: INodeProperties = {
    displayName: 'Name Pattern',
    name: 'name_pattern',
    type: 'string',
    required: false,
    default: '',
    displayOptions: {
        show: {
            '/methodCall': [
                'getTariffsList',
            ]
        }
    }
}