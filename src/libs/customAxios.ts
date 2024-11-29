import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json, text/plain, */*, multipart/form-data",
  },
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
}

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (originalRequest.data instanceof FormData) {
      originalRequest.headers["Content-Type"] = "multipart/form-data";
    } else {
      originalRequest.headers["Content-Type"] = "application/json";
    }

    if (originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/auth/refresh`,
              {
                refreshToken,
              }
            );

            const newAccessToken = response.data.accessToken;
            const newRefreshToken = response.data.refreshToken;

            localStorage.setItem("ACCESS_TOKEN", newAccessToken);
            localStorage.setItem("REFRESH_TOKEN", newRefreshToken);

            onRefreshed(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("REFRESH_TOKEN");
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(instance(originalRequest));
          });
        });
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
