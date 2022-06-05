import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "./commonError";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
	try {
		const res = await axios.get("http://localhost:5000/auth/user");
		return res.data;
	} catch (err) {
		return error(err);
	}
});
