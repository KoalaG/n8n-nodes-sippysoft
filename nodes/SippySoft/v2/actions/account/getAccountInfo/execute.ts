import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { GetAccountInfoResponse } from '../../../transport/resultTypes';

export async function getAccountInfo(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const i_account = this.getNodeParameter('i_account', index) as number;

	try {

		const responseData = await apiRequest.call(this, 'getAccountInfo', {
			i_account,
		}) as GetAccountInfoResponse;

		return this.helpers.returnJsonArray({
			...responseData,
		});

	} catch (err) {
		throw err;
	}
}
