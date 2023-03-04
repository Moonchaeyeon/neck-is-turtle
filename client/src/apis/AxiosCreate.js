import axios from 'axios';
import { getRefreshToken } from '../utils/function/TokenHandler';

const apiClient = axios.create({
    headers: {
        "Content-Type": 'application/json'
    },
    baseURL: process.env.REACT_APP_SERVER_HOST
});

// 요청 interceptor 정의
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        config.headers.Authorization = token;
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

// 응답 interceptor 정의
apiClient.interceptors.response.use(
    config => {
        return config
    },
    async (error) => {
        // access token에 문제가 있다면
        if (error.response.status === 401) {
            await getRefreshToken();
        }
        return Promise.reject(error);
    }
)

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };