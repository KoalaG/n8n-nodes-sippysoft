import { ICollectionOption } from "./IOverrides.type";

export default function end_date(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'End Date',
		description: 'End date to filter by',
		name: 'end_date',
		type: 'dateTime',
		default: '',
		...overrides,
	}
}
