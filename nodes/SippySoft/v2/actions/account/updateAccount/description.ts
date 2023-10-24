import cli_translation_rule from '../../../properties/cli_translation_rule';
import optionalCollection from '../../../properties/collections/optional';
import required from '../../../properties/collections/required';
import description from '../../../properties/description';
import i_account from '../../../properties/i_account';
import i_routing_group from '../../../properties/i_routing_group';
import type { AccountProperties } from '../../Interfaces';

export const updateAccountDescription: AccountProperties = [

	...required('updateAccount', [
		i_account(),
	]),

	optionalCollection('updateAccount', [

		/*
		username - username to login to self-care interface. String. Required.
		web_password - password to login to self-care interface. String. Required.
		authname - VoIP login. String. Required.
		voip_password - VoIP password. String. Required.
		max_sessions - Max Sessions. Integer. Required.
		max_credit_time - Max Session Time. Integer. Required.
		translation_rule - CLD Translation Rule. String. Required.
		*/
		cli_translation_rule(),
		//credit_limit - Credit Limit. Double. Required.
		i_routing_group(),

		/*
		i_billing_plan - Service plan. Integer. Required. (from version >= 1.8)
		i_account_class - Class. Integer. Optional. (from version >= 1.10)
		i_time_zone - Time Zone. Refer to Timezones List. Integer. Required.
		balance - Balance. Double. Required.
		cpe_number - CPE#. String. Required.
		vm_enabled - VM Enabled. Integer. Required.
		vm_password - PIN Code. String. Required. Should only contain digits 0-9
		vm_timeout - Timeout to redirect to VM. Integer. Optional (from version 2.0)
		vm_check_number - Access # to VM. String. Optional (from version 2.0)
		blocked - Blocked. Integer. Required.
		i_lang - Two character language code ('en' for English, 'ru' for Russian. Refer to Languages List). String. Required.
		payment_currency - Payment Currency. String. Required.
		payment_method - Payments Preferred Method. Integer. Required.
		i_export_type - Download Format. Refer to Download Formats List. Integer. Required.
		lifetime - Lifetime. Integer. Required.
		Special value:
		-1 - unlimited lifetime
		i_commission_agent - i_customer of commission agent. Integer. Optional
		commission_size - commission size in percent. Double. Optional
		preferred_codec - Preferred SIP Codec. Integer. Required. Possible values:
			Null - Disabled
			0 - G.711u
			3 - GSM
			4 - G.723
			8 - G.711a
			9 - G.722
			15 - G.728
			18 - G.729
		use_preferred_codec_only - Use Preferred Codec Only. Boolean. Required.
		reg_allowed - Allow Registration. Integer. Required.
		welcome_call_ivr - Welcome Call. Integer. Required.
		on_payment_action - On Payment. Integer. Required. Possible values:
			Null - No Action
			0 - Extend Lifetime
			1 - Clear First Use
			2 - Restart Billing
		min_payment_amount - Payments Minimum Amount. Double. Required.
		trust_cli - Trust CLI. Boolean. Required.
		disallow_loops - Disallow Loops. Boolean. Required.
		vm_notify_emails - E-Mail Notification. String. Required.
		vm_forward_emails - E-Mail Forwarding. String. Required.
		vm_del_after_fwd - Delete after forwarding. Boolean. Required.
		company_name - Company Name. String. Required.
		salutation - Mr./Ms... String. Required.
		first_name - First Name. String. Required.
		last_name - Last Name. String. Required.
		mid_init - M.I. String. Required.
		street_addr - Address. String. Required.
		state - Province/State. String. Required.
		postal_code - Postal Code. String. Required.
		city - City. String. Required.
		country - Country/Region. String. Required.
		contact - Contact. String. Required.
		phone - Phone. String. Required.
		fax - Fax. String. Required.
		alt_phone - Alternative Phone. String. Required.
		alt_contact - Alternative Contact. String. Required.
		email - E-Mail. String. Required.
		cc - CC. String. Required.
		bcc - BCC. String. Required.
		i_password_policy - Password Policy. Integer. Required.
		i_media_relay_type - Use Media Relay. Refer to Media Relay Types List. Integer. Required.
		lan_access - LAN Access. Boolean. Optional.
		batch_tag - Batch Tag. String. Optional.
		i_provisioning - Auto-Provisioning type (from version 2.0). Integer. Optional. Possible values are:
			Null - Disabled
			1 - Linksys
		invoicing_enabled - Is invoicing enabled. Boolean. Optional. (from version 2.0)
		i_invoice_template - Invoice template ID. Integer. Optional. (from version 2.0)
		i_caller_name_type - Caller name type (from version 2.0). Integer. Optional. Possible values are:
			1 - Pass-Through (do not modify Caller Name, pass it unchanged to endpoint). Default.
			2 - Use account's First-Name M.I. Last-Name
			3 - Use custom value (parameter caller_name)
			4 - Use CLI as Caller Name (added starting from version Sippy 2020)
		caller_name - Custom caller name. String. Optional. (from version 2.0)
		followme_enabled - Enable call forwarding (Follow Me). Boolean. Optional. (from version 2.1)
		vm_dialin_access - Enable external access to voicemail. Boolean. Optional. (from version 2.1)
		hide_own_cli - Enable anonymous outgoing calls. Boolean. Optional. (from version 2.1)
		block_incoming_anonymous - Block incoming anonymous calls. Boolean. Optional. (from version 2.1)
		i_incoming_anonymous_action - Action for incoming anonymous calls (from version 2.1). Integer. Possible values are:
			1 - Reject (Default)
			2 - Play prompt and reject
			3 - Send to voicemail
		dnd_enabled - Enable/Disable DND mode for account. Boolean. Optional. (from version 2.1)
		*/
		description(),
		/*
		pass_p_asserted_id - Pass header with Identity (e.g. P-Asserted-Id ) received from this account. Boolean. Optional. (from version 2.2). Documentation for <=2020 version and for >=2021 versions
		p_assrt_id_translation_rule - Translation rule for incoming Identity, e.g. received in P-Asserted-Id header. String. Optional. (from version 2.2). Documentation for <=2020 version and for >=2021 versions
		dncl_lookup - Do lookup on DNC list for the account. Boolean. Optional. (from version 4.3)
		generate_ringbacktone - Generate ringbacktone on receiving 180/181 message after 183 one has been received. Boolean. Optional. (from version 4.4)
		max_calls_per_second - Max allowed CPS. Double. Optional.
		allow_free_onnet_calls - Allow onnet calls with 0 price if account's balance is below 0. Boolean. Optional (from version 5.1)
		start_page - Start page to display upon account has logged in. Integer. Optional. (from version 5.2). Possible values are:
			1 - Calls History page
			4 - My Preferences page
		trust_privacy_hdrs - Whether privacy headers should be trusted upon authentication. Boolean. Optional. (from version 2021).
		privacy_schemas - Allowed privacy schemas in order of precedence. Array. Optional. Default is [pai,rpid] (from version 2021). Possible values are:
			empty array - no privacy headers are accepted
			pai - accept P-Asserted-Identity header. String.
			rpid - accept Remote-Party-ID header. String



		Deprecated values:

		i_tariff - Tariff. Integer. Required. (for version <= 1.7.1 only, deprecated in recent versions) Value -1 should be used to assign own tariff.
		call_recording - Enable/Disable call recording. Boolean. Optional. (from version 2.1) (removed from 4.1)
		vpn_enabled - VPN Enabled. Boolean. Optional. (removed from 2020)
		vpn_password - VPN Password. String. Optional. (removed from 2020)
	*/
	]),
];
