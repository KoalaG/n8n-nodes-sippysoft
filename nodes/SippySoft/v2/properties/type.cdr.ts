import { ICollectionOption } from "./IOverrides.type";

export default function type_cdr(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Type',
		description: 'Type of record to filter by',
		name: 'type',
		type: 'options',
		default: 'non_zero',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Complete', value: 'complete' },
			{ name: 'Errors', value: 'errors' },
			{ name: 'Incomplete', value: 'incomplete' },
			{ name: 'Non-Zero', value: 'non_zero' },
			{ name: 'Non-Zero & Errors', value: 'non_zero_and_errors' },
		],
		...overrides,
	}
}
