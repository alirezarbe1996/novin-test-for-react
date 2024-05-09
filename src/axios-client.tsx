import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient: AxiosInstance = axios.create({
    baseURL: `https://reqres.in/api`,
});

axiosClient.interceptors.request.use(
    async (config: AxiosRequestConfig): Promise<any> => {
        const token: string | null = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    async (error: any) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error: any) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }
        return Promise.reject(error);
    }
);

export default axiosClient;