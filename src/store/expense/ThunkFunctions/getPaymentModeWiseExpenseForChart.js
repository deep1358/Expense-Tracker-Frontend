import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getPaymentModeWiseExpenseForChart = createAsyncThunk(
	"expense/getPaymentModeWiseExpenseForChart",
	async ([year, month, day, category]) => {
		try {
			const res = await axios.get(
				`/expense/chart/payment_mode?year=${year}&month=${month}&day=${day}&category=${category}`
			);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
