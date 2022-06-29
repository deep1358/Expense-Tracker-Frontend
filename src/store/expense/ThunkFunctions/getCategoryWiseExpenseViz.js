import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";

export const getCategoryWiseExpenseViz = createAsyncThunk(
	"expense/getCategoryWiseExpenseViz",
	async ([year, month]) => {
		try {
			const res = await axios.get(
				`/expense/viz/categoryWise?year=${year}&month=${month}`
			);
			// console.log(res);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			// console.log(err);
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
