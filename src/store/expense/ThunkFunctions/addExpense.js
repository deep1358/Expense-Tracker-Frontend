import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";

export const addExpense = createAsyncThunk(
	"expense/addExpense",
	async ({ form, year, month, navigate }) => {
		try {
			const res = await axios.post("/expense", form);
			navigate(`/year/${year}/${month}`);
			// console.log(res);
			return { expense: res.data.expense, errorMessage: "" };
		} catch (err) {
			// console.log(err);
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
