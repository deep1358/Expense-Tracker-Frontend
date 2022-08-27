export const error = (err) => ({
	isError: true,
	status: err?.response?.status || err?.status || 500,
	message:
		err?.message ||
		err?.response?.data?.error ||
		err?.response?.statusText ||
		"Something went wrong",
});
