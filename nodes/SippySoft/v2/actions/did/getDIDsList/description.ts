import delegated_to from '../../../properties/delegated_to';
import did from '../../../properties/did';
import i_account from '../../../properties/i_account';
import i_ivr_application from '../../../properties/i_ivr_application';
import incoming_did from '../../../properties/incoming_did';
import not_assigned from '../../../properties/not_assigned';
import pagination from '../../../properties/collections/pagination';
import type { DIDProperties } from '../../Interfaces';
import optionalCollection from '../../../properties/collections/optionalFactory';

export const getDIDsListDescription: DIDProperties = [

	optionalCollection('getDIDsList', {
		displayName: 'Parameters',
		name: 'optional',
	}, [
		did('getDIDsList', false),
		incoming_did('getDIDsList', false),
		delegated_to('getDIDsList', false),
		i_account('getDIDsList', false),
		i_ivr_application('getDIDsList', false),
		not_assigned('getDIDsList', false),
	]),

	pagination('getDIDsList'),

];
