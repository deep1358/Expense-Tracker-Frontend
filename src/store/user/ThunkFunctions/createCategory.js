import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "./commonError";

export const createCategory = createAsyncThunk(
	"user/createCategory",
	async (categoryName) => {
		try {
			const res = await axios.post("http://localhost:5000/category", {
				categoryName,
			});
			return res.data.categories;
		} catch (err) {
			return error(err);
		}
	}
);
