import { deleteCategory } from "./ThunkFunctions/deleteCategory";
import { createCategory } from "./ThunkFunctions/createCategory";
import { deleteUser } from "./ThunkFunctions/deleteUser";
import { fetchUser } from "./ThunkFunctions/fetchUser";
import { logoutUser } from "./ThunkFunctions/logoutUser";
import { updateCategory } from "./ThunkFunctions/updateCategory";

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

	[createCategory.pending]: pending,
	[createCategory.fulfilled]: (state, action) => {
		if (action.payload?.isError) state.error = action.payload;
		else {
			state.user.categories = action.payload;
			state.error = null;
		}
		state.isLoading = false;
	},
	[createCategory.rejected]: rejected,

	[deleteCategory.pending]: pending,
	[deleteCategory.fulfilled]: (state, action) => {
		if (action.payload?.isError) state.error = action.payload;
		else {
			state.user.categories = action.payload;
			state.error = null;
		}
		state.isLoading = false;
	},
	[deleteCategory.rejected]: rejected,

	[updateCategory.pending]: pending,
	[updateCategory.fulfilled]: (state, action) => {
		if (action.payload?.isError) state.error = action.payload;
		else {
			state.user.categories = action.payload;
			state.error = null;
		}
		state.isLoading = false;
	},
	[updateCategory.rejected]: rejected,
};
