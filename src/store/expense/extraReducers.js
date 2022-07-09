import { addExpense } from "./ThunkFunctions/addExpense";
import { getExpenses } from "./ThunkFunctions/getExpenses";
import { deleteExpense } from "./ThunkFunctions/deleteExpense";
import { updateExpense } from "./ThunkFunctions/updateExpense";
import { getExpense } from "./ThunkFunctions/getExpense";
import { getYearWiseExpenses } from "./ThunkFunctions/getYearWiseExpenses";
import { getMonthWiseExpenses } from "./ThunkFunctions/getMonthWiseExpenses";
import { getCategoryWiseExpenseViz } from "./ThunkFunctions/getCategoryWiseExpenseViz";
import { getDayWiseExpenseViz } from "./ThunkFunctions/getDayWiseExpenseViz";
import { getMonthWiseExpenseViz } from "./ThunkFunctions/getMonthWiseExpensesViz";
import { getYearWiseExpenseViz } from "./ThunkFunctions/getYearWiseExpenseViz";

export const extraReducers = {
	[getExpenses.pending]: (state) => {
		state.gettingExpenses = true;
	},
	[getExpenses.fulfilled]: (state, action) => {
		const { expenses, errorMessage } = action.payload;
		state.gettingExpenses = false;
		state.errorMessage = errorMessage;
		state.expenses = expenses;
	},
	[getExpenses.rejected]: (state, action) => {
		state.gettingExpenses = false;
		state.error = action.error;
	},

	[getExpense.pending]: (state) => {
		state.gettingExpense = true;
	},
	[getExpense.fulfilled]: (state, action) => {
		const { expense, errorMessage } = action.payload;
		state.gettingExpense = false;
		state.errorMessage = errorMessage;
		state.focusedExpense = expense;
	},
	[getExpense.rejected]: (state, action) => {
		state.gettingExpense = false;
		state.error = action.error;
	},

	[addExpense.pending]: (state) => {
		state.creatingExpense = true;
	},
	[addExpense.fulfilled]: (state, action) => {
		const { expenses, errorMessage } = action.payload;
		state.creatingExpense = false;
		if (state.expenses && state.currentMonth === expenses?.month)
			state.expenses = [...state.expenses, expenses];
		state.error = errorMessage;
	},
	[addExpense.rejected]: (state, action) => {
		state.creatingExpense = false;
		state.error = action.error;
	},

	[deleteExpense.pending]: (state) => {
		state.deletingExpense = true;
	},
	[deleteExpense.fulfilled]: (state, action) => {
		const { errorMessage, id } = action.payload;
		state.deletingExpense = false;
		state.error = errorMessage;
		state.expenses = state.expenses.filter((expense) => expense._id !== id);
	},
	[deleteExpense.rejected]: (state, action) => {
		state.deletingExpense = false;
		state.error = action.error;
	},

	[updateExpense.pending]: (state) => {
		state.updatingExpense = true;
	},
	[updateExpense.fulfilled]: (state, action) => {
		const { errorMessage, id } = action.payload;
		state.updatingExpense = false;
		state.error = errorMessage;
		state.expenses = state.expenses?.map((expense) =>
			expense._id === id ? { ...expense, ...state.focusedExpense } : expense
		);
		state.focusedExpense = {};
	},
	[updateExpense.rejected]: (state, action) => {
		state.updatingExpense = false;
		state.error = action.error;
	},

	[getYearWiseExpenses.pending]: (state) => {
		state.isGettingYearWiseExpenses = true;
	},
	[getYearWiseExpenses.fulfilled]: (state, action) => {
		const { expenses, errorMessage } = action.payload;
		state.isGettingYearWiseExpenses = false;
		state.errorMessage = errorMessage;
		state.yearWiseExpenses = expenses;
	},
	[getYearWiseExpenses.rejected]: (state, action) => {
		state.isGettingYearWiseExpenses = false;
		state.error = action.error;
	},

	[getMonthWiseExpenses.pending]: (state) => {
		state.isGettingMonthWiseExpenses = true;
	},
	[getMonthWiseExpenses.fulfilled]: (state, action) => {
		const { expenses, errorMessage } = action.payload;
		state.isGettingMonthWiseExpenses = false;
		state.errorMessage = errorMessage;
		state.monthWiseExpenses = expenses;
	},
	[getMonthWiseExpenses.rejected]: (state, action) => {
		state.isGettingMonthWiseExpenses = false;
		state.error = action.error;
	},

	[getCategoryWiseExpenseViz.pending]: (state) => {
		state.gettingCategoryWiseExpensesViz = true;
	},
	[getCategoryWiseExpenseViz.fulfilled]: (state, action) => {
		const { expenses, errorMessage } = action.payload;
		state.gettingCategoryWiseExpensesViz = false;
		state.categoryWiseExpensesVizError = errorMessage;
		state.categoryWiseExpensesViz = expenses;
	},
	[getCategoryWiseExpenseViz.rejected]: (state, action) => {
		state.gettingCategoryWiseExpensesViz = false;
		state.error = action.error;
	},

	[getDayWiseExpenseViz.pending]: (state) => {
		state.gettingDayWiseExpensesViz = true;
	},
	[getDayWiseExpenseViz.fulfilled]: (state, action) => {
		const { expenses, errorMessage } = action.payload;
		state.gettingDayWiseExpensesViz = false;
		state.dayWiseExpensesVizError = errorMessage;
		state.dayWiseExpensesViz = expenses;
	},
	[getDayWiseExpenseViz.rejected]: (state, action) => {
		state.gettingDayWiseExpensesViz = false;
		state.error = action.error;
	},

	[getMonthWiseExpenseViz.pending]: (state) => {
		state.gettingMonthWiseExpensesViz = true;
	},
	[getMonthWiseExpenseViz.fulfilled]: (state, action) => {
		const { expenses, errorMessage } = action.payload;
		state.gettingMonthWiseExpensesViz = false;
		state.monthWiseExpensesVizError = errorMessage;
		state.monthWiseExpensesViz = expenses;
	},
	[getMonthWiseExpenseViz.rejected]: (state, action) => {
		state.gettingMonthWiseExpensesViz = false;
		state.error = action.error;
	},

	[getYearWiseExpenseViz.pending]: (state) => {
		state.gettingYearWiseExpensesViz = true;
	},
	[getYearWiseExpenseViz.fulfilled]: (state, action) => {
		const { expenses, errorMessage } = action.payload;
		state.gettingYearWiseExpensesViz = false;
		state.yearWiseExpensesVizError = errorMessage;
		state.yearWiseExpensesViz = expenses;
	},
	[getYearWiseExpenseViz.rejected]: (state, action) => {
		state.gettingYearWiseExpensesViz = false;
		state.error = action.error;
	},
};
