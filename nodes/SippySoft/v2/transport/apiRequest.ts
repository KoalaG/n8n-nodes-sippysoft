import { Deserializer, serializeMethodCall } from '@foxglove/xmlrpc';
import AxiosDigestAuth from '@koush/axios-digest-auth';
import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

/**
 * Make an API request to Sippysoft
 */
export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	operation: string,
	parameters: any = {},
) {

	const credentials = await this.getCredentials('sippysoftApi');

	if (credentials === undefined) {
		throw new Error('Credentials must be provided!');
	}

	// Generate XML String
	const xmlString = serializeMethodCall(operation, [ parameters ]);

	// Setup Authentication
	const digestAuth = new AxiosDigestAuth({
		username: credentials.username as string,
		password: credentials.password as string,
	});

	// Make Call
	const rawResponse = await digestAuth.request({
		url: `https://${credentials.server}/xmlapi/xmlapi`,
		headers: {
			Accept: "application/xml",
			"Content-Type": "application/xml"
		},
		method: "POST",
		data: xmlString,
	});

	// Deserialise response
	const dexml = new Deserializer();
	const responseData = (await dexml.deserializeMethodResponse(rawResponse.data));

	return responseData;

}
