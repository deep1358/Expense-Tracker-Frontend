import axios from "axios";

axios.defaults.withCredentials = true;

const customAxios = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 10000,
});

const errorHandler = (error) => {
	if (error.response?.status === 401) window.location = "/login";
	else if (error.response.status === 0) window.location = "/serverDown";
	return Promise.reject(error);
};

customAxios.interceptors.response.use(
	(response) => response,
	(error) => errorHandler(error)
);

export default customAxios;
