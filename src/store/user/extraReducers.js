import { deleteUser } from "./ThunkFunctions/deleteUser";
import { fetchUser } from "./ThunkFunctions/fetchUser";
import { logoutUser } from "./ThunkFunctions/logoutUser";

const pending = (state) => {
	state.isLoading = true;
};

const fulfilled = (state, action) => {
	state.user = null;
	state.isLoading = false;
	state.isLoggedIn = false;
	if (action.payload?.isError) state.error = action.payload;
};

const rejected = (state, action) => {
	state.error = action.payload;
	state.isLoading = false;
	state.isLoggedIn = false;
};

export const extraReducers = {
	[fetchUser.pending]: pending,
	[fetchUser.fulfilled]: (state, action) => {
		if (action.payload?.isError) {
			state.error = action.payload;
			state.isLoggedIn = false;
		} else if (!action.payload.user) state.isLoggedIn = false;
		else {
			state.user = action.payload.user;
			state.error = null;
		}
		state.isLoading = false;
	},
	[fetchUser.rejected]: rejected,

	[logoutUser.pending]: pending,
	[logoutUser.fulfilled]: fulfilled,
	[logoutUser.rejected]: rejected,

	[deleteUser.pending]: pending,
	[deleteUser.fulfilled]: fulfilled,
	[deleteUser.rejected]: rejected,
};
