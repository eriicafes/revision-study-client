import axios from "axios";
import { publicEnv } from "~/contexts/config";

export const AUTH_TOKEN_KEY = "auth-token";

const localStorage =
  typeof window === "undefined" ? undefined : window.localStorage;

export const http = axios.create({
  baseURL: publicEnv.apiUrl,
});

http.interceptors.request.use((config) => {
  const token = localStorage?.getItem(AUTH_TOKEN_KEY);

  // set authorization token for each request to avoid using stale local storage value
  config.headers!["Authorization"] = `Bearer ${token}`;

  return config;
});
