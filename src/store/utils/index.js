import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const slice = createSlice({
	name: "utils",
	initialState,
});

export default slice.reducer;
