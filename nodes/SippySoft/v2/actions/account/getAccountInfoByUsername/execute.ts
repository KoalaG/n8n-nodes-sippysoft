import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { GetAccountInfoResponse } from '../../../transport/resultTypes';

export async function getAccountInfoByUsername(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const username = this.getNodeParameter('username', index) as string;

	try {

		const responseData = await apiRequest.call(this, 'getAccountInfo', {
			username,
		}) as GetAccountInfoResponse;

		return this.helpers.returnJsonArray({
			...responseData,
		});

	} catch (err) {
		throw err;
	}
}
