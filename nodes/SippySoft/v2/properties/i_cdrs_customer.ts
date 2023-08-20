import { ICollectionOption } from "./IOverrides.type";

export default function i_cdrs_customer(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'CDR Customer ID',
		description: 'Only return CDRs for this customer',
		name: 'i_cdrs_customer',
		type: 'number',
		default: null,
		...overrides,
	}
}
