import { ICollectionOption } from "./IOverrides.type";

export default function delegated_to(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Assigned Customer ID',
		description: 'The internal ID of the customer record is delegated to',
		name: 'delegated_to',
		type: 'number',
		default: null,
		...overrides,
	}
}
