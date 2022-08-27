import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import categoryExists from "./categoryExists";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const createCategory = createAsyncThunk(
	"user/createCategory",
	async ([categoryName, categories, setModalOpened]) => {
		try {
			const res = await axios.post("/category", {
				categoryName,
				categories,
			});

			setModalOpened(false);

			showNotification({
				id: `addCategory-${getCurrentSeconds()}`,
				message: "Category added successfully",
				color: "teal",
				icon: <Check size={15} />,
			});

			return res.data.categories;
		} catch (err) {
			showNotification({
				id: `addCategory-${getCurrentSeconds()}`,
				message:
					err?.response?.data?.message ||
					err?.message ||
					"Error adding category",
				color: "red",
				icon: <X size={15} />,
			});
			return error(err);
		}
	}
);
