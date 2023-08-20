import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { GetAccountCDRsResponse } from '../../../transport/resultTypes';
import { PaginationProperties } from '../../../properties/collections/pagination';
import { formatDate } from '../../../transport/formatDate';
import { parseDate } from '../../../transport/parseDate';

/**
 * @link https://support.sippysoft.com/support/solutions/articles/107502-xml-rpc-api-dids-management
 * @param this
 * @param index
 * @returns
 */
export async function getAccountCDRs(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const optional = this.getNodeParameter('optional', index) as {
		i_account: number;
		start_date?: Date | string;
		end_date?: Date | string;
		cli: string;
		cld: string;
		i_cdr: number;
		type: string;
	}

	const pagination = this.getNodeParameter('pagination', index) as PaginationProperties;

	const parameters = {
		...optional,
		...pagination,
	};

	if (parameters.start_date) {
		parameters.start_date = formatDate(parameters.start_date as Date);
	}
	if (parameters.end_date) {
		parameters.end_date = formatDate(parameters.end_date as Date);
	}

	try {

		const responseData = await apiRequest.call(
			this, 'getAccountCDRs', parameters
		) as GetAccountCDRsResponse;

		return this.helpers.returnJsonArray(
			responseData.cdrs.map(cdr => ({
				...cdr,

				setup_time_raw: cdr.setup_time,
				setup_time: parseDate(cdr.setup_time),

				connect_time_raw: cdr.connect_time,
				connect_time: parseDate(cdr.connect_time),
			})),
		);

	} catch (err) {
		throw err;
	}
}
