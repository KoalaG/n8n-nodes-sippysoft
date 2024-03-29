import { ICollectionOption } from "./IOverrides.type";

export default function description(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Description',
		description: 'Description of record',
		name: 'description',
		type: 'string',
		default: '',
		...overrides,
	}
}
