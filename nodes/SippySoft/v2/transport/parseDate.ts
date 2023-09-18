import { getNodeWebhookPath } from "n8n-workflow/dist/NodeHelpers";

const monthMap: { [key: string]: string} = {
	Jan: '01',
	Feb: '02',
	Mar: '03',
	Apr: '04',
	May: '05',
	Jun: '06',
	Jul: '07',
	Aug: '08',
	Sep: '09',
	Oct: '10',
	Nov: '11',
	Dec: '12',
};

export function parseDate(
		// Date string in format %H:%M:%S.000 GMT %a %b %d %Y
    input: string
) : Date {

	const dateMatch = input.match(
		/(\d{2}):(\d{2}):(\d{2})\.000 GMT (\w{3}) (\w{3}) (\d{1,2}) (\d{4})/
	);

	if (!dateMatch) throw new Error(`Invalid date string: ${input}`);

	const isoString = `${dateMatch[7]}-${monthMap[dateMatch[5]]}-${dateMatch[6].padStart(2,'0')}T${dateMatch[1]}:${dateMatch[2]}:${dateMatch[3]}.000Z`;
	const parsedDate = new Date(isoString);

	return parsedDate;
}
