export const reducers = {
	MakeUnAuthenticated: (state) => {
		state.isLoggedin = false;
		state.user = null;
	},
};
