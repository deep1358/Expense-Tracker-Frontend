import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../../../src/axios";

export const addExpense = createAsyncThunk(
	"expense/addExpense",
	async ({ form, year, month, navigate = null }) => {
		try {
			const res = await axios.post("/expense", form);
			toast("Expense added successfully", {
				type: "success",
			});
			if (navigate !== null) navigate(`/year/${year}/${month}`);
			return { expense: res.data.expense, errorMessage: "" };
		} catch (err) {
			toast(err.response.data.message, {
				type: "error",
			});
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
