import axios, {type InternalAxiosRequestConfig, type AxiosRequestHeaders} from "axios";

const api = axios.create({
    baseURL: "https://nottowaste.onrender.com",
    headers: {
        "Content-Type": "application/json"
    },
});

const savedToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
if (savedToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
}

api.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
        const headers = (request.headers ?? {}) as AxiosRequestHeaders;
        headers["Authorization"] = `Bearer ${token}`;
        request.headers = headers;
    }
    console.log("Starting Request:", request.url);
    return request;
});

api.interceptors.response.use(response => {
    console.log('Response:', response.status, response.config.url);
    return response;
},     (error) => {
        console.log(
            "Response Error:",
            error.message,
            error.config?.method?.toUpperCase(),
            error.config?.url,
            "status:",
            error.response?.status
        );
        return Promise.reject(error);
    }
);

export default api;