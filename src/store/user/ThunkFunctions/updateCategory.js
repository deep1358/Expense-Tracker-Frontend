import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const updateCategory = createAsyncThunk(
	"user/updateCategory",
	async ([oldValue, newValue, categories, setModalOpened]) => {
		try {
			const res = await axios.patch("/category", {
				oldValue,
				newValue,
				categories,
			});

			setModalOpened(false);

			showNotification({
				id: `updateCategory-${getCurrentSeconds()}`,
				message: "Category updated successfully",
				color: "teal",
				icon: <Check size={15} />,
			});

			return res.data.categories;
		} catch (err) {
			showNotification({
				id: `updateCategory-${getCurrentSeconds()}`,
				message: err?.response?.data?.message || "Error updating category",
				color: "red",
				icon: <X size={15} />,
			});
			return error(err);
		}
	}
);
