import i_account from '../../../properties/i_account';
import pagination from '../../../properties/collections/pagination';
import type { CDRProperties } from '../../Interfaces';
import optionalCollection from '../../../properties/collections/optional';
import start_date from '../../../properties/start_date';
import end_date from '../../../properties/end_date';
import cli from '../../../properties/cli';
import cld from '../../../properties/cld';
import i_cdr from '../../../properties/i_cdr';
import type_cdr from '../../../properties/type.cdr';

export const getAccountCDRsDescription: CDRProperties = [

	optionalCollection('getAccountCDRs', [
		i_account(),
		start_date(),
		end_date(),
		cli(),
		cld(),
		i_cdr(),
		type_cdr(),
	]),

	pagination('getAccountCDRs'),

];
