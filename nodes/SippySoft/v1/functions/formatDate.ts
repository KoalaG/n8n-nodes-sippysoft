
export function formatDate(
    inputDate: string | number | Date
) : string {

	const dateObject  = new Date(inputDate);
    
	const HH    = dateObject.getUTCHours().toString().padStart(2,'0');
	const mm    = dateObject.getUTCMinutes().toString().padStart(2,'0');
	const ss    = dateObject.getUTCSeconds().toString().padStart(2,'0');
	const ddd   = dateObject.toLocaleDateString('utc', { weekday: 'short' });
	const MMM   = dateObject.toLocaleDateString('utc', { month: 'short' });
	const DD    = dateObject.getUTCDate().toString().padStart(2,'0');
	const YYYY  = dateObject.getUTCFullYear();

	return `${HH}:${mm}:${ss}.000 GMT ${ddd} ${MMM} ${DD} ${YYYY}`;

}