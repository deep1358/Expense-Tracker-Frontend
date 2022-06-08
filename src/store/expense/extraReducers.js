import { addExpense } from "./ThunkFunctions/addExpense";
import { getExpenses } from "./ThunkFunctions/getExpenses";
import { deleteExpense } from "./ThunkFunctions/deleteExpense";

export const extraReducers = {
	[getExpenses.pending]: (state) => {
		state.gettingExpenses = true;
	},
	[getExpenses.fulfilled]: (state, action) => {
		// console.log(action);
		state.gettingExpenses = false;
		state.expense = action.payload;
	},
	[getExpenses.rejected]: (state, action) => {
		state.gettingExpenses = false;
		state.error = action.error;
	},

	[addExpense.pending]: (state) => {
		state.creatingExpense = true;
	},
	[addExpense.fulfilled]: (state, action) => {
		state.creatingExpense = false;
		console.log(state.currentMonth, action.payload.month);
		if (state.currentMonth === action.payload.month)
			state.expense = [...state?.expense, action.payload];
	},
	[addExpense.rejected]: (state, action) => {
		// console.log(state, action);
		state.creatingExpense = false;
		state.error = action.error;
	},

	[deleteExpense.pending]: (state) => {
		state.deletingExpense = true;
	},
	[deleteExpense.fulfilled]: (state, action) => {
		state.deletingExpense = false;
		state.expense = state.expense.filter(
			(expense) => expense._id !== action.payload
		);
	},
	[deleteExpense.rejected]: (state, action) => {
		state.deletingExpense = false;
		state.error = action.error;
	},
};
