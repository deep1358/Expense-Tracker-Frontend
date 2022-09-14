import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const updatePaymentMode = createAsyncThunk(
	"user/updatePaymentMode",
	async ([oldValue, newValue, payment_modes, setModalOpened]) => {
		try {
			const res = await axios.patch("/payment_mode", {
				oldValue,
				newValue,
				payment_modes,
			});

			setModalOpened(false);

			showNotification({
				id: `updatePaymentMode-${getCurrentSeconds()}`,
				message: "Payment mode updated successfully",
				color: "teal",
				icon: <Check size={15} />,
			});

			return res.data.payment_modes;
		} catch (err) {
			showNotification({
				id: `updatePaymentMode-${getCurrentSeconds()}`,
				message:
					err?.response?.data?.message || "Error updating payment mode",
				color: "red",
				icon: <X size={15} />,
			});
			return error(err);
		}
	}
);
