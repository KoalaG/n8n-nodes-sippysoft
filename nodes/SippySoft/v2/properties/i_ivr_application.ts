import { ICollectionOption } from "./IOverrides.type";

export default function i_ivr_application(
	overrides?: Partial<ICollectionOption>
) : ICollectionOption {
	return {
		displayName: 'IVR Application ID',
		description: 'The internal ID of the IVR application',
		name: 'i_ivr_application',
		type: 'number',
		default: null,
		...overrides,
	}
}
