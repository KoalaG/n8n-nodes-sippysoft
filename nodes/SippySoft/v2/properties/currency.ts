import { ICollectionOption } from "./IOverrides.type";

export default function currency(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Currency',
		description: 'The 3 letter ISO4217 currency code',
		name: 'currency',
		type: 'string',
		default: '',
		...overrides,
	}
}
