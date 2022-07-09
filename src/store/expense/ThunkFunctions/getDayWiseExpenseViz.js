import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getDayWiseExpenseViz = createAsyncThunk(
	"expense/getDayWiseExpenseViz",
	async ([year, month, category]) => {
		try {
			const res = await axios.get(
				`/expense/viz/dayWise?year=${year}&month=${month}&category=${category}`
			);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
