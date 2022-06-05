import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "./commonError";

export const deleteUser = createAsyncThunk("user/deleteUser", async () => {
	try {
		await axios.delete("http://localhost:5000/auth/user");
		return null;
	} catch (err) {
		return error(err);
	}
});
