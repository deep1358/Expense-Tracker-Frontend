import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import { MantineProvider } from "@mantine/core";
import { Global } from "@mantine/core";
import { MakeUnAuthenticated } from "./store/user";

const UNAUTHORIZED = 401;
const { dispatch } = store; // direct access to redux store.
axios.interceptors.response.use(
	(response) => response,
	(error) => {
		const { status } = error.response;
		if (status === UNAUTHORIZED) dispatch(MakeUnAuthenticated());
		return Promise.reject(error);
	}
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<MantineProvider
		theme={{ colorScheme: "dark" }}
		withGlobalStyles
		withNormalizeCSS
	>
		<Global
			styles={(theme) => ({
				"*, *::before, *::after": {
					margin: 0,
					padding: 0,
					boxSizing: "border-box",
				},
				".apexcharts-zoomin-icon,.apexcharts-zoomout-icon,.apexcharts-zoom-icon,.apexcharts-pan-icon,.apexcharts-reset-icon":
					{
						display: "none",
					},
				body: {
					...theme.fn.fontStyles(),
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[7]
							: theme.white,
					color:
						theme.colorScheme === "dark"
							? theme.colors.dark[0]
							: theme.black,
					lineHeight: theme.lineHeight,
					fontFamily: "Lora, serif",
				},
			})}
		/>
		<Provider store={store}>
			<App />
		</Provider>
	</MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
