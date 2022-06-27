import { deleteCategory } from "./ThunkFunctions/deleteCategory";
import { createCategory } from "./ThunkFunctions/createCategory";
import { deleteUser } from "./ThunkFunctions/deleteUser";
import { fetchUser } from "./ThunkFunctions/fetchUser";
import { logoutUser } from "./ThunkFunctions/logoutUser";
import { updateCategory } from "./ThunkFunctions/updateCategory";

export const extraReducers = {
	[fetchUser.pending]: (state) => {
		state.isFetchingUser = true;
		state.isFetchingCategories = true;
	},
	[fetchUser.fulfilled]: (state, action) => {
		if (action.payload?.isError) {
			state.error = action.payload.message;
			state.isLoggedIn = false;
		} else if (!action.payload.user) state.isLoggedIn = false;
		else {
			state.user = action.payload.user;
			state.error = null;
		}
		state.isFetchingUser = false;
		state.isFetchingCategories = false;
	},
	[fetchUser.rejected]: (state, action) => {
		state.error = action.payload;
		state.isFetchingUser = false;
		state.isFetchingCategories = false;
		state.isLoggedIn = false;
	},

	[logoutUser.pending]: (state) => {
		state.isLoggingOut = true;
	},
	[logoutUser.fulfilled]: (state, action) => {
		state.user = null;
		state.isLoggedIn = false;
		state.isLoggingOut = false;
		if (action.payload?.isError) state.error = action.payload;
	},
	[logoutUser.rejected]: (state, action) => {
		state.error = action.payload;
		state.isLoggingOut = false;
	},

	[deleteUser.pending]: (state) => {
		state.isDeletingUser = true;
	},
	[deleteUser.fulfilled]: (state, action) => {
		state.user = null;
		state.isLoggedIn = false;
		state.isDeletingUser = false;
		if (action.payload?.isError) state.error = action.payload;
	},
	[deleteUser.rejected]: (state, action) => {
		state.error = action.payload;
		state.isDeletingUser = false;
	},

	[createCategory.pending]: (state) => {
		state.isCreatingCategory = true;
	},
	[createCategory.fulfilled]: (state, action) => {
		if (action.payload?.isError) state.error = action.payload;
		else {
			state.user.categories = action.payload;
			state.error = null;
		}
		state.isCreatingCategory = false;
	},
	[createCategory.rejected]: (state, action) => {
		state.error = action.payload;
		state.isCreatingCategory = false;
	},

	[deleteCategory.pending]: (state) => {
		state.isDeletingCategory = true;
	},
	[deleteCategory.fulfilled]: (state, action) => {
		if (action.payload?.isError) state.error = action.payload;
		else {
			state.user.categories = action.payload;
			state.error = null;
		}
		state.isDeletingCategory = false;
	},
	[deleteCategory.rejected]: (state, action) => {
		state.error = action.payload;
		state.isDeletingCategory = false;
	},

	[updateCategory.pending]: (state) => {
		state.isUpdatingCategory = true;
	},
	[updateCategory.fulfilled]: (state, action) => {
		if (action.payload?.isError) state.error = action.payload;
		else {
			state.user.categories = action.payload;
			state.error = null;
		}
		state.isUpdatingCategory = false;
	},
	[updateCategory.rejected]: (state, action) => {
		state.error = action.payload;
		state.isUpdatingCategory = false;
	},
};
