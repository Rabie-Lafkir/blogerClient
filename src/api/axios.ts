import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

export type ApiResponse<T = unknown> = Promise<AxiosResponse<T>>;

/** 
 * Axios instance with base config 
 */
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  withCredentials: false,
});

/** 
 * Automatically attach JWT from localStorage to every request 
 */
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

/** 
 * Handle 401 responses globally: logout user + redirect if needed 
 */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      // Optional: redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
