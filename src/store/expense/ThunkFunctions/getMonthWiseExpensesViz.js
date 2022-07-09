import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getMonthWiseExpenseViz = createAsyncThunk(
	"expense/getMonthWiseExpenseViz",
	async ([year, day, category]) => {
		try {
			const res = await axios.get(
				`/expense/viz/monthWise?year=${year}&day=${day}&category=${category}`
			);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
