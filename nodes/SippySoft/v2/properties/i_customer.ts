import { ICollectionOption } from "./IOverrides.type";

export default function i_customer(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Customer ID',
		description: 'The internal ID of the customer',
		name: 'i_customer',
		type: 'number',
		default: null,
		...overrides,
	}
}
