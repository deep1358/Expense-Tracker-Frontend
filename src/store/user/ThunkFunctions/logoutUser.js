import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
	try {
		await axios.post("/auth/logout");
		window.location = "/login";
		return null;
	} catch (err) {
		return error(err);
	}
});
