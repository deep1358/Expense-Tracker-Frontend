export const reducers = {
	MakeUnAuthenticated: (state) => {
		state.loggedIn = false;
		state.user = null;
	},
	loggingOutToggler: (state, action) => {
		state.loggingOut = action.payload;
	},
};
