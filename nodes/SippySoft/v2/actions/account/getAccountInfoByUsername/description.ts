import required from '../../../properties/collections/required';
import username from '../../../properties/username';
import type { AccountProperties } from '../../Interfaces';

export const getAccountInfoByUsernameDescription: AccountProperties = [
	...required('getAccountInfoByUsername', [
		username(),
	]),
];
