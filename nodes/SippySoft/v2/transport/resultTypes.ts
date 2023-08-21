
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
