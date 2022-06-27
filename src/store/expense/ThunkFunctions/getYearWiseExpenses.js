import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getYearWiseExpenses = createAsyncThunk(
	"expense/getYearWiseExpenses",
	async () => {
		try {
			const res = await axios.get(`/expense/yearWiseExpense`);
			// console.log(res);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			// console.log(err);
			return {
				errorMessage: err.response.data.message,
				yearWiseExpenses: null,
			};
		}
	}
);
