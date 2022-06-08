import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getExpenses = createAsyncThunk(
	"expense/getExpenses",
	async ([year, month]) => {
		try {
			const res = await axios.get(
				`http://localhost:5000/expense/year/${year}/${month}`
			);
			return res.data;
		} catch (err) {
			return err;
		}
	}
);
