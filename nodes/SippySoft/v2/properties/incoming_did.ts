import { ICollectionOption } from "./IOverrides.type";

export default function incoming_did(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Incoming DID Number',
		description: 'This is the number as it comes from the DID gateway or DID provider',
		name: 'incoming_did',
		type: 'string',
		default: '',
		...overrides,
	}
}
