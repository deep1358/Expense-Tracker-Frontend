import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";

export const createUser = createAsyncThunk(
	"user/createUser",
	async ([userEmail, userName, userAvatar]) => {
		try {
			const res = await axios.post("/auth/createUser", {
				userEmail,
				userName,
				userAvatar,
			});
			if (res.data.user._id) window.location.href = "/";
			return res.data;
		} catch (err) {
			return error(err);
		}
	}
);
