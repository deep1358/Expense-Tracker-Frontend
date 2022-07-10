import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { MakeUnAuthenticated } from "./store/user";

import "react-toastify/dist/ReactToastify.css";

const UNAUTHORIZED = 401;
const { dispatch } = store; // direct access to redux store.
axios.interceptors.response.use(
	(response) => response,
	(error) => {
		const { status } = error.response;
		if (status === UNAUTHORIZED) {
			dispatch(MakeUnAuthenticated());
			// window.location = "/login";
		}
		return Promise.reject(error);
	}
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<ToastContainer
			position="top-center"
			hideProgressBar={true}
			closeOnClick
		/>
		<Provider store={store}>
			<App />
		</Provider>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
