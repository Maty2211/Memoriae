import axios from "axios";
import { ensureCsrf, getCSRFCookie } from "./csrf";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/",
  withCredentials: true,     // Manda/recibe cookies en ambos entornos
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

api.interceptors.request.use(async (config) => {
  const method = (config.method || "get").toLowerCase();
  const unsafe = ["post", "put", "patch", "delete"].includes(method);
  if (unsafe) {
    if (!getCSRFCookie()) await ensureCsrf();
    config.headers["X-CSRFToken"] = getCSRFCookie();
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }
  return config;
});

export default api;