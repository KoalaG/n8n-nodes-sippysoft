import { ICollectionOption } from "./IOverrides.type";

export default function i_did(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'DID ID',
		description: 'The internal ID of the DID',
		name: 'i_did',
		type: 'number',
		default: null,
		...overrides,
	}
}
