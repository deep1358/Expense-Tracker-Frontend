import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const addExpense = createAsyncThunk(
	"expense/addExpense",
	async ({ form, year, month, navigate = null }) => {
		const { category, amount, note, payment_mode, date } = form;
		try {
			const res = await axios.post("/expense", {
				category,
				amount,
				note,
				payment_mode,
				date,
			});
			showNotification({
				id: `addExpense-${getCurrentSeconds()}`,
				message: "Expense added successfully",
				color: "teal",
				icon: <Check size={15} />,
			});
			if (navigate !== null) navigate(`/years/${year}/${month}`);
			return { expense: res.data.expense, errorMessage: "" };
		} catch (err) {
			showNotification({
				id: `addExpense-${getCurrentSeconds()}`,
				message: err.response.data.message || "Error adding expense",
				color: "red",
				icon: <X size={15} />,
			});
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
