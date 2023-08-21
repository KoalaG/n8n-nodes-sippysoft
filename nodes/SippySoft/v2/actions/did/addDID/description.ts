import cli_translation_rule from '../../../properties/cli_translation_rule';
import optionalCollection from '../../../properties/collections/optional';
import required from '../../../properties/collections/required';
import description from '../../../properties/description';
import did from '../../../properties/did';
import i_account from '../../../properties/i_account';
import i_connection from '../../../properties/i_connection';
import i_ivr_application from '../../../properties/i_ivr_application';
import i_vendor from '../../../properties/i_vendor';
import incoming_did from '../../../properties/incoming_did';
import translation_rule from '../../../properties/translation_rule';
import type { DIDProperties } from '../../Interfaces';

export const addDIDDescription: DIDProperties = [

	...required('addDID', [
		did(),
		incoming_did(),
	]),

	optionalCollection('addDID', [
		translation_rule(),
		cli_translation_rule(),
		description(),
		i_ivr_application(),
		i_account(),
		i_vendor(),
		i_connection(),
	])
	// did_range_end - DID range end. String. Optional. (since 2023)
	// i_did_allocated_from - i_did that child DID or DID subrange is allocated from. Integer. Optional. (since 2023)


	// cld_translation_rule - CLD translation rule. String. Optional. (removed since 5.1)
	// i_dids_charging_group - Selling charging group. Integer. Optional.
	// fwd_did - Forward DID number. Boolean. Optional. (removed since 2.2)
	// buying_i_dids_charging_group - Charging group to charge vendor. Integer. Optional. (since 2.2)
	// incoming_cli - Incoming CLI to match authentication rule. String. Optional. (since 2020)

];
