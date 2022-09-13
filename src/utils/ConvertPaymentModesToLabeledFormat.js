// Convert array to array of Object like {label: 'Cash'}

export const ConvertPaymentModesToLabeledFormat = (paymentModes) =>
	paymentModes.map((paymentMode) => {
		return {
			label: paymentMode,
		};
	});
