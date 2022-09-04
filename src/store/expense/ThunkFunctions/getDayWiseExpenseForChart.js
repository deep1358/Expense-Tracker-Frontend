import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getDayWiseExpenseForChart = createAsyncThunk(
	"expense/getDayWiseExpenseForChart",
	async ([year, month, category, payment_mode]) => {
		try {
			const res = await axios.get(
				`/expense/chart/day?year=${year}&month=${month}&category=${category}&payment_mode=${payment_mode}`
			);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
