import requiredCollection from '../../../properties/collections/required';
import i_account from '../../../properties/i_account';
import type { AccountProperties } from '../../Interfaces';

export const getRegistrationStatusDescription: AccountProperties = [

	requiredCollection('getRegistrationStatus', [
		i_account(),
	]),
];
