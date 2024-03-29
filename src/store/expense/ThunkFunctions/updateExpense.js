import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const updateExpense = createAsyncThunk(
	"expense/updateExpense",
	async ({ form, year, month, _id, navigate }) => {
		const { category, amount, note, payment_mode } = form;
		try {
			await axios.patch("/expense", {
				category,
				amount,
				note,
				payment_mode,
				_id,
			});
			showNotification({
				id: `updateExpense-${getCurrentSeconds()}`,
				message: "Expense updated successfully",
				color: "teal",
				icon: <Check size={15} />,
			});
			navigate(`/years/${year}/${month}`);
			return { errorMessage: "", _id };
		} catch (err) {
			showNotification({
				id: `updateExpense-${getCurrentSeconds()}`,
				message: err.response.data.message || "Error updating expense",
				color: "red",
				icon: <X size={15} />,
			});
			return { errorMessage: err.response.data.message };
		}
	}
);
