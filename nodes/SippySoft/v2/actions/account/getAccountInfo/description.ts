import required from '../../../properties/collections/required';
import i_account from '../../../properties/i_account';
import type { AccountProperties } from '../../Interfaces';

export const getAccountInfoDescription: AccountProperties = [
	...required('getAccountInfo', [
		i_account(),
	]),
];
