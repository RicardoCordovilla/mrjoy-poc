import { api } from "../axios.config";

export const AxiosInterceptor = () => {
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                // closeModal();
                window.location.href = '/#/login';
            }
            return Promise.reject(error);
        }
    );
}