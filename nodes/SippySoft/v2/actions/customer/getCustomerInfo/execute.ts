import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { GetCustomerInfoResponse } from '../../../transport/resultTypes';

export async function getCustomerInfo(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const i_customer = this.getNodeParameter('i_customer', index) as number;

	try {

		const responseData = await apiRequest.call(this, 'getCustomerInfo', {
			i_customer,
		}) as GetCustomerInfoResponse;

		return this.helpers.returnJsonArray({
			...responseData,
		});

	} catch (err) {
		throw err;
	}
}
