import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const updateEmailSubscription = createAsyncThunk(
    "user/updateEmailSubscription",
    async (email_subscription) => {
        try {
            const res = await axios.patch("/email/change", {
                email_subscription,
            });

            showNotification({
                id: `updateEmailSubscription-${getCurrentSeconds()}`,
                message: res.data.message,
                color: "teal",
                icon: <Check size={15} />,
            });

            return email_subscription;
        } catch (err) {
            showNotification({
                id: `updateEmailSubscription-${getCurrentSeconds()}`,
                message:
                    err?.response?.data?.message ||
                    "Error updating Email Subscription",
                color: "red",
                icon: <X size={15} />,
            });
            return error(err);
        }
    }
);
