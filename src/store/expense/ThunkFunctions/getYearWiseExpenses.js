import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getYearWiseExpenses = createAsyncThunk(
	"expense/getYearWiseExpenses",
	async () => {
		try {
			const res = await axios.get(`/expense/yearWiseExpense`);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return {
				errorMessage: err.response.data.message,
				yearWiseExpenses: null,
			};
		}
	}
);
