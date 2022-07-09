import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";

export const getExpense = createAsyncThunk("expense/getExpense", async (id) => {
	try {
		const res = await axios.get(`/expense/${id}`);
		return { expense: res.data, errorMessage: "" };
	} catch (err) {
		return { errorMessage: err.response.data.message, expense: null };
	}
});
