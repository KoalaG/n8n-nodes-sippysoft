import { ICollectionOption } from "./IOverrides.type";

export default function amount(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Amount',
		description: 'The amount of the transaction',
		name: 'amount',
		type: 'number',
		default: null,
		...overrides,
	}
}
