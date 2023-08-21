import amount from '../../../properties/amount';
import required from '../../../properties/collections/required';
import currency from '../../../properties/currency';
import i_account from '../../../properties/i_account';
import type { AccountProperties } from '../../Interfaces';

export const accountCreditDescription: AccountProperties = [

	...required('accountCredit', [
		i_account(),
		amount(),
		currency(),
	]),

	// Optional
	// payment_notes,
	// payment_time,

];
