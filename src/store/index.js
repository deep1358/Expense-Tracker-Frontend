import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./user/index";

const reducer = combineReducers({
	user,
});

const store = configureStore({ reducer });

export default store;
