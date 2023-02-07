import axios from "axios";

export const authFetch = axios.create({ baseURL: "/api" });

authFetch.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});
