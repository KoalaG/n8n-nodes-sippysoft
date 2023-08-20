import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { ListAccountsResponse } from '../../../transport/resultTypes';
import { PaginationProperties } from '../../../properties/collections/pagination';

/**
 * @link https://support.sippysoft.com/support/solutions/articles/107322-xml-rpc-api-listing-accounts
 * @param this
 * @param index
 * @returns
 */
export async function listAccounts(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const pagination = this.getNodeParameter('pagination', index) as PaginationProperties;

	try {
		const responseData = await apiRequest.call(this, 'listAccounts', {
			...pagination,
		}) as ListAccountsResponse;

		return this.helpers.returnJsonArray(
			responseData.accounts
		);

	} catch (err) {
		throw err;
	}
}
