import { ICollectionOption } from "./IOverrides.type";

export default function i_routing_group(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Routing Group ID',
		description: 'The internal ID of the Routing Group',
		name: 'i_routing_group',
		type: 'number',
		default: null,
		...overrides,
	}
}
