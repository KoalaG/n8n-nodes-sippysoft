import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

import { apiRequest } from '../../../transport';
import { UpdateAccountResponse } from '../../../transport/resultTypes';
/**
 * @link https://support.sippysoft.com/support/solutions/articles/107312-xml-rpc-api-account-creation-and-parameters
 * @param this
 * @param index
 * @returns
 */
export async function updateAccount(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {

	const i_account = this.getNodeParameter('i_account', index) as number;
	const optional = this.getNodeParameter('optional', index) as any;

	const updateData: any = {
		i_account,
		...optional,
	}

	try {

		const responseData = await apiRequest.call(this, 'updateAccount', updateData) as UpdateAccountResponse;

		return this.helpers.returnJsonArray({
			i_account,
			...responseData,
		});

	} catch (err) {

		// Throw any other errors
		throw err;

	}
}
