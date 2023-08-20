
type SippyMethodDefinition = {
	resources: string[],
	operation: string,
	paginated?: boolean,
}

const paginated = true;

export const SippyMethodDefinitions: { [key: string]: SippyMethodDefinition } = {
	'getAccountsCDRs': 				{ resources: [ 'Account', 'CDR',						 	], operation: 'Get Account CDRs', 			paginated },
	'getCustomerCDRs': 				{ resources: [ 						'CDR',	'Customer' 	], operation: 'Get Customer CDRs',			paginated },
	'listAccounts': 					{ resources: [ 'Account',											], operation: 'List Accounts',					paginated },
	'getTariffsList': 				{ resources: [ 										'Misc'			], operation: 'Get Tariffs List',				paginated },
	'getDIDsList': 						{ resources: [ 										'DID',			], operation: 'Get DIDs List',					paginated },
	'getRegistrationStatus': 	{ resources: [ 'Account', 										], operation: 'Get Registrations',		 						},
}

export const paginatedMethods = Object
	.keys(SippyMethodDefinitions)
	.filter(key => SippyMethodDefinitions[key].paginated);
