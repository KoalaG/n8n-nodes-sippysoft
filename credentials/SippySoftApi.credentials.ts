import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SippySoftApi implements ICredentialType {

	name = 'sippysoftApi';
	displayName = 'SippySoft API';
	//documentationUrl = '<your-docs-url>';
	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: 'ssp-root',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

}
