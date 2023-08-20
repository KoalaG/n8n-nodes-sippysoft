import { ICollectionOption } from "./IOverrides.type";


export default function not_assigned(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Not Assigned',
		description: 'Whether the DID is assigned to an account',
		name: 'not_assigned',
		type: 'boolean',
		default: true,
		...overrides,
	}
}
