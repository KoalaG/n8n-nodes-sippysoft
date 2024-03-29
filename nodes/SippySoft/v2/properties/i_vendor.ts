import { ICollectionOption } from "./IOverrides.type";

export default function i_vendor(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'Vendor ID',
		description: 'The internal ID of the vendor',
		name: 'i_vendor',
		type: 'number',
		default: null,
		...overrides,
	}
}
