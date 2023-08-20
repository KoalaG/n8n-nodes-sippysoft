import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type SippysoftMap = {
	account: 'getRegistrationStatus';
	did: /*'addDID' | 'updateDID' | 'deleteDID' | 'getDIDInfo' |*/ 'getDIDsList' /*| 'getDIDChargingGroupInfo' | 'addDIDDelegation' | 'updateDIDDelegation' | 'deleteDIDDelegation'*/;
	/*
	message: 'delete' | 'post' | 'postEphemeral';
	reaction: 'create' | 'delete' | 'getAll';
	user: 'create' | 'deactive' | 'getAll' | 'getByEmail' | 'getById' | 'invite';
	*/
};

export type Sippysoft = AllEntities<SippysoftMap>;

export type SippysoftAccount = Entity<SippysoftMap, 'account'>;
export type SippysoftDID = Entity<SippysoftMap, 'did'>;
/*export type SippysoftMessage = Entity<SippysoftMap, 'message'>;
export type SippysoftReaction = Entity<SippysoftMap, 'reaction'>;
export type SippysoftUser = Entity<SippysoftMap, 'user'>;
*/

export type AccountProperties = PropertiesOf<SippysoftAccount>;
export type DIDProperties = PropertiesOf<SippysoftDID>;
//export type MessageProperties = PropertiesOf<MattermostMessage>;
//export type ReactionProperties = PropertiesOf<MattermostReaction>;
//export type UserProperties = PropertiesOf<MattermostUser>;