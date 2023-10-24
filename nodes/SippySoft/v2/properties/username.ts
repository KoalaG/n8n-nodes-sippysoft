import { ICollectionOption } from "./IOverrides.type";

export default function username(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Username',
		description: 'Username of record',
		name: 'username',
		type: 'string',
		default: '',
		...overrides,
	}
}
