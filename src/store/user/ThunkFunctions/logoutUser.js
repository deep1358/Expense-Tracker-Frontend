import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "./commonError";

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
	try {
		await axios.post("http://localhost:5000/auth/logout");
		return null;
	} catch (err) {
		return error(err);
	}
});
