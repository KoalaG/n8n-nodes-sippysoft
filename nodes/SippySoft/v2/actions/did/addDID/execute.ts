import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { GetRegistrationStatusResponse } from '../../../transport/resultTypes';
import { parseDate } from '../../../transport/parseDate';

/**
 * @link https://support.sippysoft.com/support/solutions/articles/107502-xml-rpc-api-dids-management
 * @param this
 * @param index
 * @returns
 */
export async function addDID(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const required = this.getNodeParameter('required', index) as {
		did: string;
		incoming_did: string;
	};

	const optional = this.getNodeParameter('optional', index) as {
		translation_rule: string;
		cli_translation_rule: string;
		descriptions: string;
		i_ivr_application: string;
		i_account: string;
		i_vendor: string;
		i_connection: string;
	}

	try {

		const responseData = await apiRequest.call(this, 'addDID', {
			...required,
			...optional,
		}) as GetRegistrationStatusResponse;

		return this.helpers.returnJsonArray({
			...responseData,
			expires_raw: responseData.expires,
			expires: parseDate(responseData.expires),
		});

	} catch (err) {
		throw err;
	}
}
