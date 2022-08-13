export const reducers = {
	toggleLoadingOverlay: (state, action) => {
		state.loadingOverlay = action.payload;
	},
	showAlert: (state, action) => {
		state.showAlert = true;
		state.alertMessage = action.payload.alertMessage;
		state.alertCloseButton = action.payload?.alertCloseButton;
	},
	removeAlert: (state) => {
		state.showAlert = false;
		state.alertMessage = "";
		state.alertCloseButton = false;
	},
};
