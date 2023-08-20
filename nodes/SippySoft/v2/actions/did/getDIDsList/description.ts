import delegated_to from '../../../properties/delegated_to';
import did from '../../../properties/did';
import i_account from '../../../properties/i_account';
import i_ivr_application from '../../../properties/i_ivr_application';
import incoming_did from '../../../properties/incoming_did';
import not_assigned from '../../../properties/not_assigned';
import pagination from '../../../properties/collections/pagination';
import type { DIDProperties } from '../../Interfaces';
import optionalCollection from '../../../properties/collections/optional';

export const getDIDsListDescription: DIDProperties = [

	optionalCollection('getDIDsList', [
		did(),
		incoming_did(),
		delegated_to(),
		i_account(),
		i_ivr_application(),
		not_assigned(),
	]),

	pagination('getDIDsList'),

];
