import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./user/index";
import expense from "./expense/index";

const reducer = combineReducers({
	user,
	expense,
});

const store = configureStore({ reducer });

export default store;
