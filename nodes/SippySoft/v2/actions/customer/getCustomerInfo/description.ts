import required from '../../../properties/collections/required';
import i_customer from '../../../properties/i_customer';
import type { CustomerProperties } from '../../Interfaces';

export const getCustomerInfoDescription: CustomerProperties = [
	...required('getCustomerInfo', [
		i_customer(),
	]),
];
