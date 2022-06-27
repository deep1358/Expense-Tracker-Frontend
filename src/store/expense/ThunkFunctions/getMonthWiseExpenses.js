import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getMonthWiseExpenses = createAsyncThunk(
	"expense/getMonthWiseExpenses",
	async (year) => {
		try {
			const res = await axios.get(`/expense/year/${year}`);
			// console.log(res);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			// console.log(err);
			return {
				errorMessage: err.response.data.message,
				monthWiseExpenses: null,
			};
		}
	}
);
