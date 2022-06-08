import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addExpense = createAsyncThunk(
	"expense/addExpense",
	async (expense) => {
		try {
			const res = await axios.post("http://localhost:5000/expense", expense);
			return res.data.expense;
		} catch (err) {
			return err.response.data.message;
		}
	}
);
