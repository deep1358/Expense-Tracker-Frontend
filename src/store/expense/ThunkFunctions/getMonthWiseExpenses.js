import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getMonthWiseExpenses = createAsyncThunk(
	"expense/getMonthWiseExpenses",
	async (year) => {
		try {
			const res = await axios.get(`/expense/year/${year}`);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			return {
				errorMessage: err.response.data.message,
				monthWiseExpenses: null,
			};
		}
	}
);
