import axios, { AxiosRequestConfig } from "axios";
import apiConfig from "./endpoint";

const BASE_URL = apiConfig.BASE_URL;

type AxiosConfig = AxiosRequestConfig & {
	baseURL?: string;
};
const axiosConfig: AxiosConfig = {
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
	httpsAgent: {
		rejectUnauthorized: false,
	},
};

if (BASE_URL) {
	axiosConfig.baseURL = BASE_URL;
}

const api = axios.create(axiosConfig);

// Enable CORS (Cross-Origin Resource Sharing)
api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
api.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
api.defaults.headers.common["Access-Control-Allow-Headers"] =
	"Origin, Accept, Content-Type, X-Requested-With, Authorization";

// Define request and response interceptors for error handling, token handling, etc.
api.interceptors.request.use(
	(config) => {
		// You can modify the request config here (e.g., adding authentication headers)
		return config;
	},
	(error) => {
		// Handle request errors (e.g., network issues)
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		// You can perform global response handling here (e.g., logging, token refreshing)
		return response;
	},
	(error) => {
		// Handle response errors (e.g., unauthorized access, server errors)
		return Promise.reject(error);
	}
);

export default api;
