import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

export type ApiResponse<T = unknown> = Promise<AxiosResponse<T>>;

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  withCredentials: false,
});

/* ---- add JWT automatically ---- */
api.interceptors.request.use((cfg: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && cfg.headers) {
    (cfg.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return cfg;
});

/* ---- optional global 401 handler ---- */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
