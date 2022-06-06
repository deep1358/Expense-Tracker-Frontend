import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "./commonError";

export const updateCategory = createAsyncThunk(
	"user/updateCategory",
	async ([oldValue, newValue]) => {
		console.log(oldValue, newValue);
		try {
			const res = await axios.patch("http://localhost:5000/category", {
				oldValue,
				newValue,
			});
			return res.data.categories;
		} catch (err) {
			return error(err);
		}
	}
);
