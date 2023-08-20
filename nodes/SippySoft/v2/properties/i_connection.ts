import { ICollectionOption } from "./IOverrides.type";

export default function i_connection(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Connection ID',
		description: 'The internal ID of the connection',
		name: 'i_connection',
		type: 'number',
		default: null,
		...overrides,
	}
}
