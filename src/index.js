import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import axios from "./axios";
import { MantineProvider } from "@mantine/core";
import { Global } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { styles } from "./index.style";
import { toggleLoadingOverlay } from "./store/utils";

axios.interceptors.request.use(
    async function (request) {
        const user_id = await store.getState().user.user?._id;

        const customRequest = {
            ...request,
            headers: { ...request.headers, user_id },
        };

        return customRequest;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) window.location = "/login";
        else if (error.response.status === 0) window.location = "/serverDown";
        store.dispatch(toggleLoadingOverlay(false));
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
        <NotificationsProvider
            position="bottom-center"
            zIndex={2077}
            autoClose={10000}
        >
            <Global styles={styles} />
            <Provider store={store}>
                <App />
            </Provider>
        </NotificationsProvider>
    </MantineProvider>
);
