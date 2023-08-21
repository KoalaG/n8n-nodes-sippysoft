import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { accountCreditResponse } from '../../../transport/resultTypes';

export async function accountCredit(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const i_account = this.getNodeParameter('i_account', index) as number;
	const amount = this.getNodeParameter('amount', index) as number;
	const currency = this.getNodeParameter('currency', index) as string;

	try {

		const responseData = await apiRequest.call(this, 'accountCredit', {
			i_account,
			amount,
			currency,
		}) as accountCreditResponse;

		return this.helpers.returnJsonArray({
			i_account,
			...responseData,
		});

	} catch (err) {
		// Throw any other errors
		throw err;

	}
}
