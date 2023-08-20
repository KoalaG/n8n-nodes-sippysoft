import pagination from '../../../properties/collections/pagination';
import type { CDRProperties } from '../../Interfaces';
import optionalCollection from '../../../properties/collections/optional';
import start_date from '../../../properties/start_date';
import end_date from '../../../properties/end_date';
import cli from '../../../properties/cli';
import cld from '../../../properties/cld';
import type_cdr from '../../../properties/type.cdr';
import i_customer from '../../../properties/i_customer';
import i_cdrs_customer from '../../../properties/i_cdrs_customer';

export const getCustomerCDRsDescription: CDRProperties = [

	optionalCollection('getCustomerCDRs', [
		i_customer(),
		start_date(),
		end_date(),
		cli(),
		cld(),
		i_cdrs_customer(),
		type_cdr(),
	]),

	pagination('getCustomerCDRs'),

];
