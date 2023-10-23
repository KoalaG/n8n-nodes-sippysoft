import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { ListCustomersResponse } from '../../../transport/resultTypes';
import { PaginationProperties } from '../../../properties/collections/pagination';

/**
 * @link https://support.sippysoft.com/support/solutions/articles/107423-xml-rpc-api-getting-a-list-of-customers
 * @param this
 * @param index
 * @returns
 */
export async function listCustomers(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const pagination = this.getNodeParameter('pagination', index) as PaginationProperties;

	try {
		const responseData = await apiRequest.call(this, 'listCustomers', {
			...pagination,
		}) as ListCustomersResponse;

		return this.helpers.returnJsonArray(
			responseData.customers
		);

	} catch (err) {
		throw err;
	}
}
