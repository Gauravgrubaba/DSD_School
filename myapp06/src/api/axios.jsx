import axios from "axios";

const api = axios.create({
    baseURL: '/api',
    withCredentials: true
});

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if(error.response.status === 403 &&
            error.response.data?.code === 'TOKEN_EXPIRED' &&
            !originalRequest._retry 
        ) {
            originalRequest._retry = true;
            try {
                const response = await api.post('/user/refresh-token');
                const newAccessToken = response.data.accessToken;
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.log("Session expired, please login again");
                return Promise.reject(refreshError);
            }
        }
    }
)

export default api;

