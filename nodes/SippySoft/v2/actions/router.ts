import { type IExecuteFunctions, type IDataObject, type INodeExecutionData, NodeOperationError } from 'n8n-workflow';

import * as account from './account';
import * as did from './did';
import * as cdr from './cdr';
import * as customer from './customer';
import type { Sippysoft } from './Interfaces';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const operationResult: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let i = 0; i < items.length; i++) {
		const resource = this.getNodeParameter<Sippysoft>('resource', i);
		let operation = this.getNodeParameter('operation', i);

		const sippysoft = {
			resource,
			operation,
		} as Sippysoft;

		try {
			if (sippysoft.resource === 'account') {
				responseData = await account[sippysoft.operation].execute.call(this, i);
			}
			else if (sippysoft.resource === 'did') {
				responseData = await did[sippysoft.operation].execute.call(this, i);
			}
			else if (sippysoft.resource === 'cdr') {
				responseData = await cdr[sippysoft.operation].execute.call(this, i);
			}
			else if (sippysoft.resource === 'customer') {
				responseData = await customer[sippysoft.operation].execute.call(this, i);
			}

			const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData),
				{ itemData: { item: i } },
			);
			operationResult.push(...executionData);
		} catch (error) {
			if (this.continueOnFail()) {
				const json = this.getInputData(i) ? this.getInputData(i)[0].json : items[i].json;
				operationResult.push({ json: { input: json, error }, error, pairedItem: i });
			} else {
				// Adding `itemIndex` allows other workflows to handle this error
				if (error.context) {
					// If the error thrown already contains the context property,
					// only append the itemIndex
					error.context.itemIndex = i;
					throw error;
				}
				throw new NodeOperationError(this.getNode(), error, {
					itemIndex: i,
				});
			}
		}
	}

	return [operationResult];
}
