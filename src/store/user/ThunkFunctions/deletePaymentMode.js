import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const deletePaymentMode = createAsyncThunk(
	"user/deletePaymentMode",
	async ([paymentModeName, payment_modes, setDeleteModalOpened]) => {
		try {
			await axios.delete(`/payment_mode/${paymentModeName}`);

			setDeleteModalOpened(false);

			showNotification({
				id: `deletePaymentMode-${getCurrentSeconds()}`,
				message: "Payment mode deleted successfully",
				color: "teal",
				icon: <Check size={15} />,
			});
			return payment_modes.filter(
				(payment_mode) => payment_mode !== paymentModeName
			);
		} catch (err) {
			showNotification({
				id: `deletePaymentMode-${getCurrentSeconds()}`,
				message: err.response.data.message || "Error deleting payment mode",
				color: "red",
				icon: <X size={15} />,
			});
			return error(err);
		}
	}
);
