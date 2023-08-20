import { ICollectionOption } from "./IOverrides.type";

export default function start_date(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Start Date',
		description: 'Start date to filter by',
		name: 'start_date',
		type: 'dateTime',
		default: '',
		...overrides,
	}
}
