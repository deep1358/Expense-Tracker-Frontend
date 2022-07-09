import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getYearWiseExpenseViz = createAsyncThunk(
	"expense/getYearWiseExpenseViz",
	async ([month, day, category]) => {
		try {
			const res = await axios.get(
				`/expense/viz/yearWise?month=${month}&day=${day}&category=${category}`
			);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
