export const reducers = {
	setIsLoading: (state, action) => {
		state.isLoading = action.payload;
	},
	setError: (state, action) => {
		state.error = action.payload;
	},
};
