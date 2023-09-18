
export function parseDate(
		// Date string in format %H:%M:%S.000 GMT %a %b %d %Y
    input: string
) : Date {

	const dateMatch = input.match(
		/(\d{2}):(\d{2}):(\d{2})\.000 GMT (\w{3}) (\w{3}) (\d{1,2}) (\d{4})/
	);

	const parsedDate = new Date(
		`${dateMatch![5]} ${dateMatch![4]} ${dateMatch![7]} ${dateMatch![1]}:${dateMatch![2]}:${dateMatch![3]}`
	);


	return parsedDate;
}
