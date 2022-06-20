export const initialState = {
	expenses: null,
	focusedExpense: {},
	error: null,
	currentYear: new Date().getFullYear(),
	currentMonth: new Date().getMonth() + 1,
	gettingExpenses: false,
	gettingExpense: false,
	creatingExpense: false,
	updatingExpense: false,
	deletingExpense: false,
};
