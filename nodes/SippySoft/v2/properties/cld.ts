import { ICollectionOption } from "./IOverrides.type";


export default function cld(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'CLD',
		description: 'The CLD of the call',
		name: 'cld',
		type: 'string',
		default: '',
		...overrides,
	}
}
