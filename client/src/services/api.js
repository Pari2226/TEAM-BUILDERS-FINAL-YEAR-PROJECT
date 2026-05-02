import axios from "axios";

let tokenGetter = async () => null;

export const setAuthTokenGetter = (getter) => {
  tokenGetter = getter;
};

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await tokenGetter();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
