import axios from "axios";
// helpers que ya uso con fetch:
import { ensureCsrf, getCSRFCookie } from "./csrf";

const api = axios.create({
  baseURL: "/",              // ← rutas relativas para usar el proxy
  withCredentials: true,     // ← manda/recibe cookies
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

// Agrega automaticamente el CSRF a POST/PUT/PATCH/DELETE
api.interceptors.request.use(async (config) => {
  const method = (config.method || "get").toLowerCase();
  const unsafe = ["post", "put", "patch", "delete"].includes(method);
  if (unsafe) {
    if (!getCSRFCookie()) await ensureCsrf(); // pega a /api/csrf/
    config.headers["X-CSRFToken"] = getCSRFCookie();
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }
  return config;
});

export default api;