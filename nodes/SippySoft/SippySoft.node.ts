
import {
    INodeTypeBaseDescription,
		IVersionedNodeType,
		VersionedNodeType
} from 'n8n-workflow';

import { SippysoftV1 } from './v1/SippysoftV1.node';
import { SippysoftV2 } from './v2/SippysoftV2.node';

export class Sippysoft extends VersionedNodeType {

	constructor() {

		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'SippySoft',
			name: 'sippysoft',
			//icon: 'file:sippysoft.svg',
			group: [],
			subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
			description: "Consume SippySoft API",
			defaultVersion: 2,
		}

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new SippysoftV1(baseDescription),
			2: new SippysoftV2(baseDescription),
		}

		super(nodeVersions, baseDescription);

	}

}
