import axios from "axios";
// import { store } from "redux";

axios.defaults.withCredentials = true;

const customAxios = axios.create({
	baseURL: `http://localhost:5000`,
	timeout: 10000,
});

const requestHandler = (request) => request;

const responseHandler = (response) => {
	// console.log(response, "Good");
	// if (response.status === 401) {
	// 	window.location = "/login";
	// }
	return response;
};

const errorHandler = (error) => {
	// console.log(error, "Error");
	if (error.response.status === 401) window.location = "/login";
	else if (error.response.status === 0) alert("Server is not running");
	return Promise.reject(error);
};

customAxios.interceptors.request.use(
	(request) => requestHandler(request),
	(error) => errorHandler(error)
);

customAxios.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);

export default customAxios;
