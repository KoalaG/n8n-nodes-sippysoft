import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { GetDIDsListResponse } from '../../../transport/resultTypes';
import { PaginationProperties } from '../../../properties/collections/pagination';

/**
 * @link https://support.sippysoft.com/support/solutions/articles/107502-xml-rpc-api-dids-management
 * @param this
 * @param index
 * @returns
 */
export async function getDIDsList(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const optional = this.getNodeParameter('optional', index) as {
		did?: string;
		incoming_did?: string;
		delegated_to?: number;
		i_account?: number;
		i_ivr_application?: number;
		not_assigned?: boolean;
	}

	const pagination = this.getNodeParameter('pagination', index) as PaginationProperties;

	try {

		const responseData = await apiRequest.call(this, 'getDIDsList', {
			...optional,
			...pagination,
		}) as GetDIDsListResponse;

		return this.helpers.returnJsonArray(
			responseData.dids,
		);

	} catch (err) {
		throw err;
	}
}
