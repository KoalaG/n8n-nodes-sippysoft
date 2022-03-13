import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { serializeMethodCall, Deserializer } from '@foxglove/xmlrpc';
import AxiosDigestAuth from '@koush/axios-digest-auth';

function formatDate(date: string) : string {
	const d = new Date(date);
	const HH    = d.getUTCHours().toString().padStart(2,'0');
	const mm    = d.getUTCMinutes().toString().padStart(2,'0');
	const ss    = d.getUTCSeconds().toString().padStart(2,'0');
	const ddd   = d.toLocaleDateString('utc', { weekday: 'short' });
	const MMM   = d.toLocaleDateString('utc', { month: 'short' });
	const DD    = d.getUTCDate().toString().padStart(2,'0');
	const YYYY  = d.getUTCFullYear();
	return `${HH}:${mm}:${ss}.000 GMT ${ddd} ${MMM} ${DD} ${YYYY}`;
}

export class SippySoft implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SippySoft API',
		name: 'sippySoft',
		group: ['communication'],
		version: 1,
		description: 'Consume SippySoft API',
		subtitle: '={{$parameter["methodCall"] + ": " + $parameter["sippyDomain"]}}',
		defaults: {
			name: 'SippySoft',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'httpDigestAuth',
				required: true,
			},
		],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'SippySoft Server',
				name: 'sippyDomain',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'my.sippy.server',
				description: 'The domain name of your sippy server.',
			},
			{
				displayName: 'Method Call',
				name: 'methodCall',
				type: 'options',
				required: true,
				default: '',
				options: [
					{ name: 'GET - Account CDRs', value: 'getAccountCDRs' }
				],
				placeholder: 'Select Method Call',
				description: 'The method to call on the Sippy API',
			},

			{
				displayName: 'Call Parameters',
				name: 'callParameters',
				type: 'collection',
				placeholder: 'Add Parameter',
				default: {},
				options: [

					{
						displayName: 'Account',
						name: 'i_account',
						type: 'number',
						required: false,
						default: '',
						displayOptions: {
							show: {
								'/methodCall': [
									'getAccountCDRs',
								]
							}
						}
					},


					{
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
					},


					{
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
					},




					{
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

				]
			}

			/*
				offset - skip fist offset CDRs. Integer. Optional.
				limit - return only limit CDRs. Integer. Optional.
				cli - fetch CDRs with CLI (after translation rules applied) like cli. String. Optional.
				cld - fetch CDRs with CLD (after translation rules applied) like cld. String. Optional.
				i_cdr - return only specified CDR. String. Optional. (new since 4.4)
			*/
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();

		let item: INodeExecutionData;
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			item = items[itemIndex];

			// Retrieve required paramaters
			const sippyDomain = this.getNodeParameter('sippyDomain', itemIndex) as string;
			const httpDigestAuth = await this.getCredentials('httpDigestAuth') as { user: string, password: string };
			const methodCall = this.getNodeParameter('methodCall', itemIndex, '') as string;
			const paramaters = this.getNodeParameter('callParameters', itemIndex) as {
				start_date: any,
				end_date: any,
			};

			// Format specific parameter values
			if (paramaters.start_date) {
				paramaters.start_date = formatDate(paramaters.start_date);
			}
			if (paramaters.end_date) {
				paramaters.end_date = formatDate(paramaters.end_date);
			}

			// Generate XML String
			const xmlString = serializeMethodCall(methodCall, [ {
				...paramaters
			} ]);

			// Setup Authentication
			const digestAuth = new AxiosDigestAuth({
				username: httpDigestAuth.user as string,
				password: httpDigestAuth.password as string,
			});

			// Make Call
			const rawResponse = await digestAuth.request({
				url: `https://${sippyDomain}/xmlapi/xmlapi`,
				headers: { 
					Accept: "application/xml",
					"Content-Type": "application/xml"
				},
				method: "POST",
				data: xmlString,
			});

			// Deserialise response
			const dexml = new Deserializer();
			const resp = (await dexml.deserializeMethodResponse(rawResponse.data)) as object;

			// Replace item with response
			item.json = { ...resp };
			
		}

		return this.prepareOutputData(items);

	}

}
