import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";

export const deleteExpense = createAsyncThunk(
	"expense/deleteExpense",
	async (id) => {
		try {
			await axios.delete(`expense/${id}`);
			alert("Expense deleted");
			return { errorMessage: "", id };
		} catch (err) {
			return { errorMessage: err.response.data.message };
		}
	}
);
