import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";

export const deleteUser = createAsyncThunk(
	"user/deleteUser",
	async (handleLogoutUser) => {
		try {
			await axios.delete(`/auth/user`);
			handleLogoutUser("Your account has been deleted successfully!");
			return null;
		} catch (err) {
			return error(err);
		}
	}
);
