import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getYearWiseExpenseForChart = createAsyncThunk(
	"expense/getYearWiseExpenseForChart",
	async ([month, day, category, payment_mode]) => {
		try {
			const res = await axios.get(
				`/expense/chart/year?month=${month}&day=${day}&category=${category}&payment_mode=${payment_mode}`
			);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
