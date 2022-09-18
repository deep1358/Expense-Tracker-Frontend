import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const createPaymentMode = createAsyncThunk(
	"user/createPaymentMode",
	async ([paymentModeName, payment_modes, setModalOpened]) => {
		try {
			const res = await axios.post("/payment_mode", {
				paymentModeName,
				payment_modes,
			});

			setModalOpened(false);

			showNotification({
				id: `addPaymentMode-${getCurrentSeconds()}`,
				message: "Payment mode added successfully",
				color: "teal",
				icon: <Check size={15} />,
			});

			return res.data.payment_modes;
		} catch (err) {
			showNotification({
				id: `addPaymentMode-${getCurrentSeconds()}`,
				message:
					err?.response?.data?.message ||
					err?.message ||
					"Error adding payment mode",
				color: "red",
				icon: <X size={15} />,
			});
			return error(err);
		}
	}
);
