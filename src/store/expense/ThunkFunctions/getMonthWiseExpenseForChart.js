import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getMonthWiseExpenseForChart = createAsyncThunk(
	"expense/getMonthWiseExpenseForChart",
	async ([year, day, category, payment_mode]) => {
		try {
			const res = await axios.get(
				`/expense/chart/month?year=${year}&day=${day}&category=${category}&payment_mode=${payment_mode}`
			);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
