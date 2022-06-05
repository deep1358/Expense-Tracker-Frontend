import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { reducers } from "./reducers";
import { extraReducers } from "./extraReducers";

const slice = createSlice({
	name: "user",
	initialState,
	reducers,
	extraReducers,
});

export default slice.reducer;

// Actions

export const { setUser, clearUser, setIsLoading, setError } = slice.actions;
