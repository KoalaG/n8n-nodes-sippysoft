import { ICollectionOption } from "./IOverrides.type";

export default function translation_rule(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Translation Rule',
		description: 'Translation rule applied to DID',
		name: 'translation_rule',
		type: 'string',
		default: '',
		...overrides,
	}
}
