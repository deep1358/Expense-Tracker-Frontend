import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getCategoryWiseExpenseViz = createAsyncThunk(
	"expense/getCategoryWiseExpenseViz",
	async ([year, month, day]) => {
		try {
			const res = await axios.get(
				`/expense/viz/categoryWise?year=${year}&month=${month}&day=${day}`
			);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
