
const monthMap = {
	0: 'Jan',
	1: 'Feb',
	2: 'Mar',
	3: 'Apr',
	4: 'May',
	5: 'Jun',
	6: 'Jul',
	7: 'Aug',
	8: 'Sep',
	9: 'Oct',
	10: 'Nov',
	11: 'Dec',
};

const dayMap = {
	0: 'Sun',
	1: 'Mon',
	2: 'Tue',
	3: 'Wed',
	4: 'Thu',
	5: 'Fri',
	6: 'Sat',
};

export function formatDate(
    inputDate: string | number | Date
) : string {

	const dateObject  = new Date(inputDate);


	const utcMonth  	 = dateObject.getUTCMonth();
	const utcDayOfWeek = dateObject.getUTCDay();

	const HH    = dateObject.getUTCHours().toString().padStart(2,'0');
	const mm    = dateObject.getUTCMinutes().toString().padStart(2,'0');
	const ss    = dateObject.getUTCSeconds().toString().padStart(2,'0');
	const MMM   = monthMap[utcMonth as keyof typeof monthMap];
	const ddd   = dayMap[utcDayOfWeek as keyof typeof dayMap];
	const DD    = dateObject.getUTCDate().toString().padStart(2,'0');
	const YYYY  = dateObject.getUTCFullYear();

	const dateString = `${HH}:${mm}:${ss}.000 GMT ${ddd} ${MMM} ${DD} ${YYYY}`;

	return dateString;

}
