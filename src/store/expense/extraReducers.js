import { addExpense } from "./ThunkFunctions/addExpense";
import { getExpenses } from "./ThunkFunctions/getExpenses";
import { deleteExpense } from "./ThunkFunctions/deleteExpense";
import { updateExpense } from "./ThunkFunctions/updateExpense";
import { getExpense } from "./ThunkFunctions/getExpense";

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
};
