import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";

export const updateExpense = createAsyncThunk(
	"expense/updateExpense",
	async ({ form, year, month, id, navigate }) => {
		try {
			await axios.patch("/expense", {
				category: form.category,
				amount: form.amount,
				note: form.note,
				_id: id,
			});
			navigate(`/year/${year}/${month}`);
			return { errorMessage: "", id };
		} catch (err) {
			return { errorMessage: err.response.data.message };
		}
	}
);
