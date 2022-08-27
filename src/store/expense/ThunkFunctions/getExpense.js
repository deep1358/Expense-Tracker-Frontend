import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const getExpense = createAsyncThunk(
	"expense/getExpense",
	async (_id) => {
		try {
			const res = await axios.get(`/expense/${_id}`);
			return { expense: res.data, errorMessage: "" };
		} catch (err) {
			showNotification({
				id: `getExpense-${getCurrentSeconds()}`,
				message: "Error getting expense",
				color: "red",
				icon: <X size={15} />,
			});
			return { errorMessage: err.response.data.message, expense: null };
		}
	}
);
