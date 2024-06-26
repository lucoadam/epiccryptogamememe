import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    timeout: 60000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        if(response.data?.data?.accessToken) {
            localStorage.setItem('accessToken', response.data.data.accessToken)
        }
        return response?.data
    },
    error => {
        if(error.response?.status === 401) {
            localStorage.removeItem('accessToken')
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;