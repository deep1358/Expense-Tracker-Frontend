import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getCategoryWiseExpenseForChart = createAsyncThunk(
	"expense/getCategoryWiseExpenseForChart",
	async ([year, month, day, payment_mode]) => {
		try {
			const res = await axios.get(
				`/expense/chart/category?year=${year}&month=${month}&day=${day}&payment_mode=${payment_mode}`
			);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
