import { ICollectionOption } from "./IOverrides.type";

export default function cli_translation_rule(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'CLI Translation Rule',
		description: 'Translation rule applied to CLI',
		name: 'cli_translation_rule',
		type: 'string',
		default: '',
		...overrides,
	}
}
