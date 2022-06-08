import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteExpense = createAsyncThunk(
	"expense/deleteExpense",
	async (id) => {
		try {
			await axios.delete(`http://localhost:5000/expense/${id}`);
			return id;
		} catch (err) {
			return err.response.data.message;
		}
	}
);
