import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";

export const updateCategory = createAsyncThunk(
	"user/updateCategory",
	async ([oldValue, newValue]) => {
		try {
			const res = await axios.patch("/category", {
				oldValue,
				newValue,
			});
			return res.data.categories;
		} catch (err) {
			return error(err);
		}
	}
);
