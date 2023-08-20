import required from '../../../properties/collections/required';
import i_account from '../../../properties/i_account';
import type { AccountProperties } from '../../Interfaces';

export const getRegistrationStatusDescription: AccountProperties = [

	...required('getRegistrationStatus', [
		i_account(),
	]),
];
