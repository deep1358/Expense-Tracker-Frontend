import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";

export const createCategory = createAsyncThunk(
	"user/createCategory",
	async (categoryName) => {
		try {
			const res = await axios.post("/category", {
				categoryName,
			});
			return res.data.categories;
		} catch (err) {
			return error(err);
		}
	}
);
