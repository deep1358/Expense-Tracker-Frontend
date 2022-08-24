import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";

export const fetchUser = createAsyncThunk("user/fetchUser", async (email) => {
	try {
		const res = await axios.post("/auth/user", { email });
		return res.data;
	} catch (err) {
		return error(err);
	}
});
