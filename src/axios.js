import axios from "axios";

axios.defaults.withCredentials = true;

const customAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 10000,
});

export default customAxios;
