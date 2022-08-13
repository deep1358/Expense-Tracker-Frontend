// Check if the month is valid
export const checkMonthValidity = (month, months) => {
	const tempMonth =
		month.toLowerCase().charAt(0).toUpperCase() +
		month.toLowerCase().slice(1);
	if (months.includes(tempMonth)) return tempMonth;
	return "";
};
