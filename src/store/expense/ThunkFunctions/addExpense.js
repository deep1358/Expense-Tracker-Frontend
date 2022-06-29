import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";

export const addExpense = createAsyncThunk(
	"expense/addExpense",
	async ({ form, year, month, navigate = null }) => {
		try {
			// console.log(navigate);
			const res = await axios.post("/expense", form);
			if (navigate !== null) navigate(`/year/${year}/${month}`);
			// console.log(res);
			return { expense: res.data.expense, errorMessage: "" };
		} catch (err) {
			// console.log(err);
			alert(err.response.data.message);
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
