import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";

export const getExpenses = createAsyncThunk(
	"expense/getExpenses",
	async ([year, month]) => {
		try {
			const res = await axios.get(`/expense/year/${year}/${month}`);
			// console.log(res);
			return { expenses: res.data, errorMessage: "" };
		} catch (err) {
			// console.log(err);
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
