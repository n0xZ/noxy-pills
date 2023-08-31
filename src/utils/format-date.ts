export const formateDateToISO = (date: Date) => {
	const dateYear = date.getFullYear();
	const dateMonth = (date.getMonth() + 1).toString().padStart(2, "0");
	const dateDay = date.getDate().toString().padStart(2, "0");
	const parsedFormatDate = `${dateYear}-${dateMonth}-${dateDay}`;
	return parsedFormatDate;
};
