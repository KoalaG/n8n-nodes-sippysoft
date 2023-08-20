import { ICollectionOption } from "./IOverrides.type";

export default function i_cdr(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'CDR ID',
		description: 'The internal ID of the CDR',
		name: 'i_cdr',
		type: 'number',
		default: null,
		...overrides,
	}
}
