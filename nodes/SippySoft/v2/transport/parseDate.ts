
export function parseDate(
    input: string
) : Date {
	return new Date(Date.parse(input));
}
