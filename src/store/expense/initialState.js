export const initialState = {
	expense: null,
	error: null,
	currentYear: new Date().getFullYear(),
	currentMonth: new Date().getMonth() + 1,
	gettingExpenses: false,
	creatingExpense: false,
	updatingExpense: false,
	deletingExpense: false,
};
