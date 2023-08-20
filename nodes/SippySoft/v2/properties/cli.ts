import { ICollectionOption } from "./IOverrides.type";

export default function cli(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'CLI',
		description: 'The CLI of the call',
		name: 'cli',
		type: 'string',
		default: '',
		...overrides,
	}
}
