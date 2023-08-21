
export type GetRegistrationStatusResponse = {
	result: 'OK';
	user_agent: string;
	contact: string;
	expires: string;
}

export type ListAccountsResponse = {
	result: 'OK';
	accounts: {
		i_account: number;
		username: string;
		description: string;
		blocked: boolean;
		expired: boolean;
		balance: number;
		credit_limit: number;
		base_currency: string;
		registration_status: Omit<GetRegistrationStatusResponse, 'result'> | null;
	}[];
}

export type GetDIDsListResponse = {
	result: 'OK';
	dids: {
		i_did: number;
		did: string;
		did_range_end: string;
		i_did_allocated_from: number;
		incoming_did: string;
		translation_rule: string;
		cli_translation_rule: string;
		description: string;
		i_ibr_application: number;
		i_account: number;
		i_dids_charging_group: number;
		i_vendor: number;
		i_connection: number;
		buying_i_dids_charging_group: number;
		i_did_delegation: number;
		delegated_to: number;
		parent_i_did_delegation: number;
		incoming_cli: string;
	}[]
}

export type GetAccountCDRsResponse = {
	result: 'OK';
	cdrs: {
		i_account: number;
		setup_time: string;
		connect_time: string;
		billed_duration: number;
		plan_duration: number;
		cli: string;
		cld: string;
		cli_in: string;
		cld_in: string;
		cost: string;
		country: string;
		description: string;
		remote_ip: string;
		result: number;
		protocol: string;
		accessibility_cost: number;
		grace_period: number;
		post_call_surcharge: number;
		connect_fee: number;
		free_seconds: number;
		duration: number;
		interval_1: number;
		interval_n: number;
		price_1: number;
		price_n: number;
		delay: number;
		pdd1xx: number;
		i_call: string;
		call_id: string;
		i_cdr: number;
		prefix: string;
		lrn_cld: string;
		lrn_cld_in: string;
		p_asserted_id: string;
		remote_party_id: string;
		release_source: string;
		user_agent: string;
		area_name: string;
	}[]
}
export type GetCustomerCDRsResponse = {
	result: 'OK';
	cdrs: {
		i_customer: number;
		i_call: string;
		call_id: string;
		setup_time: string;
		connect_time: string;
		billed_duration: number;
		cli: string;
		cld: string;
		cli_in: string;
		cld_in: string;
		cost: string;
		country: string;
		description: string;
		remote_ip: string;
		result: number;
	}[]
}

export type accountCreditResponse = {
	result: 'OK';
}

export type GetAccountInfoResponse = {
	i_contact: number;
	username: string;
	balance_bak: number;
	i_account: number;
	sessions: number;
	authname: string;
	credit_limit_bak: number;
	i_customer: number;
	max_sessions: number;
	translation_rule: string;
	i_time_zone: number;
	max_credit_time: number;
	base_currency: string;
	cpe_number: string;
	vm_enabled: number;
	blocked: number;
	i_lang: string;
	payment_currency: string;
	payment_method: number;
	last_login: string;
	i_export_type: number;
	first_use: string;
	lifetime: number;
	use_preferred_codec_only: boolean;
	cli_translation_rule: string;
	reg_allowed: number;
	first_reg_done: boolean;
	first_reg_next_call: string;
	first_reg_call_count: number;
	welcome_call_ivr: number;
	on_payment_action: number;
	min_payment_amount: number;
	trust_cli: boolean;
	disallow_loops: boolean;
	batch_tag: string;
	vm_notify_emails: string;
	vm_forward_emails: string;
	vm_del_after_fwd: boolean;
	commission_size: number;
	i_routing_group: number;
	description: string;
	i_password_policy: number;
	i_billing_plan: number;
	billing_plan_suspended: boolean;
	next_billing_time: string;
	i_media_relay_type: number;
	i_account_class: number;
	invoicing_enabled: boolean;
	i_invoice_template: number;
	vm_timeout: number;
	vm_check_number: string;
	try_unsuspend: boolean;
	i_caller_name_type: number;
	caller_name: string;
	i_followme_mode: number;
	vm_dialin_access: boolean;
	dnd_enabled: boolean;
	block_incoming_anonymous: boolean;
	i_incoming_anonymous_action: number;
	hide_own_cli: boolean;
	last_change_count: number;
	pass_p_asserted_id: boolean;
	p_assrt_id_translation_rule: string;
	followme_timeout: number;
	dncl_lookup: boolean;
	created_on: string;
	created_by: string;
	updated_on: string;
	updated_by: string;
	call_recording: boolean;
	record_version: number;
	generate_ringbacktone: boolean;
	balance: number;
	credit_limit: number;
	allow_free_onnet_calls: boolean;
	start_page: number;
	trust_privacy_hdrs: boolean;
	privacy_schemas: string[];
	company_name: string;
	salutation: string;
	first_name: string;
	mid_init: string;
	last_name: string;
	street_addr: string;
	state: string;
	postal_code: string;
	city: string;
	country: string;
	contact: string;
	phone: string;
	fax: string;
	alt_phone: string;
	alt_contact: string;
	email: string;
	cc: string;
	bcc: string;


	web_password: string;
	voip_password: string;
	vm_password: string;
	i_commission_agent: number;
	preferred_codec: number;
	lan_access: boolean;
	i_provisioning: number;
	followme_enabled: boolean;
	block_incoming_anonymouse: boolean;
	i_incoming_anonumous_action: number;
	max_calls_per_second: number;
}
