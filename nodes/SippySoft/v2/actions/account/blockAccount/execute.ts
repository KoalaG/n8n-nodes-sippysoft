import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { GetRegistrationStatusResponse } from '../../../transport/resultTypes';
import { parseDate } from '../../../transport/parseDate';

/**
 * @link https://support.sippysoft.com/support/solutions/articles/107340-xml-rpc-api-blocking-and-unblocking-accounts
 * @param this
 * @param index
 * @returns
 */
export async function getRegistrationStatus(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const i_account = this.getNodeParameter('i_account', index) as number;

	try {

		const responseData = await apiRequest.call(this, 'getRegistrationStatus', {
			i_account,
		}) as GetRegistrationStatusResponse;

		return this.helpers.returnJsonArray({
			i_account,
			...responseData,
			expires_raw: responseData.expires,
			expires: parseDate(responseData.expires),
		});

	} catch (err) {

		// Handle the case where the account is not registered
		if (err.faultCode == 403 && err.faultString == 'Account is not registered') {
			return this.helpers.returnJsonArray([{
				i_account,
				result: 'Not registered'
			}]);
		}

		// Throw any other errors
		throw err;

	}
}
