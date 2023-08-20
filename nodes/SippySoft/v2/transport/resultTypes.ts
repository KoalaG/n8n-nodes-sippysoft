
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
