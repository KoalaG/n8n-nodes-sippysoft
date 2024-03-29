import { ICollectionOption } from "./IOverrides.type";

export default function did(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'DID Number',
		description: 'The canonic E.164 number that is used by the system for billing and accounting purposes',
		name: 'did',
		type: 'string',
		default: '',
		...overrides,
	}
}
