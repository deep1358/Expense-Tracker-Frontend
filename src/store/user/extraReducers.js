import { deleteCategory } from "./ThunkFunctions/deleteCategory";
import { createCategory } from "./ThunkFunctions/createCategory";
import { deleteUser } from "./ThunkFunctions/deleteUser";
import { fetchUser } from "./ThunkFunctions/fetchUser";
import { updateCategory } from "./ThunkFunctions/updateCategory";
import { createUser } from "./ThunkFunctions/createUser";
import { createPaymentMode } from "./ThunkFunctions/createPaymentMode";
import { deletePaymentMode } from "./ThunkFunctions/deletePaymentMode";
import { updatePaymentMode } from "./ThunkFunctions/updatePaymentMode";
import { updateEmailSubscription } from "./ThunkFunctions/updateEmailSubscription";

export const extraReducers = {
    [fetchUser.pending]: (state) => {
        state.fetchingUser = true;
        state.fetchingCategories = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
        if (action.payload?.isError) {
            state.error = action.payload.message;
            state.loggedIn = false;
        } else if (!action.payload.user) state.loggedIn = false;
        else {
            state.user = action.payload.user;
            state.error = null;
        }
        state.fetchingUser = false;
        state.fetchingCategories = false;
    },
    [fetchUser.rejected]: (state, action) => {
        state.error = action.payload;
        state.fetchingUser = false;
        state.fetchingCategories = false;
        state.loggedIn = false;
    },

    [createUser.pending]: (state) => {
        state.fetchingUser = true;
        state.fetchingCategories = true;
    },
    [createUser.fulfilled]: (state, action) => {
        state.loggedIn = false;
        state.user = action.payload.user;
        if (action.payload?.isError) state.error = action.payload.message;
        else state.error = null;
        state.fetchingUser = false;
        state.fetchingCategories = false;
    },
    [createUser.rejected]: (state, action) => {
        state.error = action.payload;
        state.fetchingUser = false;
        state.fetchingCategories = false;
        state.loggedIn = false;
    },

    [deleteUser.pending]: (state) => {
        state.deletingUser = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
        state.user = null;
        state.loggedIn = false;
        state.deletingUser = false;
        if (action.payload?.isError) state.error = action.payload;
    },
    [deleteUser.rejected]: (state, action) => {
        state.deletingUser = false;
    },

    [createCategory.pending]: (state) => {
        state.creatingCategory = true;
    },
    [createCategory.fulfilled]: (state, action) => {
        if (action.payload?.isError) state.error = action.payload;
        else {
            state.user.categories = action.payload;
            state.error = null;
        }
        state.creatingCategory = false;
    },
    [createCategory.rejected]: (state, action) => {
        state.error = action.payload;
        state.creatingCategory = false;
    },

    [deleteCategory.pending]: (state) => {
        state.deletingCategory = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
        if (action.payload?.isError) state.error = action.payload;
        else {
            state.user.categories = action.payload;
            state.error = null;
        }
        state.deletingCategory = false;
    },
    [deleteCategory.rejected]: (state, action) => {
        state.error = action.payload;
        state.deletingCategory = false;
    },

    [updateCategory.pending]: (state) => {
        state.updatingCategory = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
        if (action.payload?.isError) state.error = action.payload;
        else {
            state.user.categories = action.payload;
            state.error = null;
        }
        state.updatingCategory = false;
    },
    [updateCategory.rejected]: (state, action) => {
        state.error = action.payload;
        state.updatingCategory = false;
    },

    [createPaymentMode.pending]: (state) => {
        state.creatingPaymentMode = true;
    },
    [createPaymentMode.fulfilled]: (state, action) => {
        if (action.payload?.isError) state.error = action.payload;
        else {
            state.user.payment_modes = action.payload;
            state.error = null;
        }
        state.creatingPaymentMode = false;
    },
    [createPaymentMode.rejected]: (state, action) => {
        state.error = action.payload;
        state.creatingPaymentMode = false;
    },

    [deletePaymentMode.pending]: (state) => {
        state.deletingPaymentMode = true;
    },
    [deletePaymentMode.fulfilled]: (state, action) => {
        if (action.payload?.isError) state.error = action.payload;
        else {
            state.user.payment_modes = action.payload;
            state.error = null;
        }
        state.deletingPaymentMode = false;
    },
    [deletePaymentMode.rejected]: (state, action) => {
        state.error = action.payload;
        state.deletingPaymentMode = false;
    },

    [updatePaymentMode.pending]: (state) => {
        state.updatingPaymentMode = true;
    },
    [updatePaymentMode.fulfilled]: (state, action) => {
        if (action.payload?.isError) state.error = action.payload;
        else {
            state.user.payment_modes = action.payload;
            state.error = null;
        }
        state.updatingPaymentMode = false;
    },
    [updatePaymentMode.rejected]: (state, action) => {
        state.error = action.payload;
        state.updatingPaymentMode = false;
    },
    [updateEmailSubscription.pending]: (state) => {
        state.updatingEmailSubscription = true;
    },
    [updateEmailSubscription.fulfilled]: (state, action) => {
        if (action.payload?.isError) state.error = action.payload;
        else {
            state.user.email_subscription = action.payload;
            state.error = null;
        }
        state.updatingEmailSubscription = false;
    },
    [updateEmailSubscription.rejected]: (state, action) => {
        state.error = action.payload;
        state.updatingEmailSubscription = false;
    },
};
