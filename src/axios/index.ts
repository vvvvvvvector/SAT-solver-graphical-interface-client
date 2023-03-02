import axios, { AxiosRequestConfig } from "axios";

import { baseURL } from "./constants";

const config: AxiosRequestConfig = { baseURL };

const axiosInstance = axios.create(config);

export default axiosInstance;
