import { ICollectionOption } from "./IOverrides.type";

export default function i_account(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Account ID',
		description: 'The internal ID of the account',
		name: 'i_account',
		type: 'number',
		default: null,
		...overrides,
	}
}
