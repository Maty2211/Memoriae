// flashcard.api.jsx
import axios from "axios";
import { ensureCsrf, getCSRFCookie } from "./csrf"; // usa el mismo helper

const API = axios.create({
  baseURL: "/flashcard",       // ← rutas relativas (usa proxy)
  withCredentials: true,       // ← MUY IMPORTANTE: envía cookies
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

// Interceptor para JWT + CSRF (si ambos se usan)
API.interceptors.request.use(async (config) => {
  const method = (config.method || "get").toLowerCase();
  const unsafe = ["post", "put", "patch", "delete"].includes(method);

  // Si usas JWT
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Si tu backend también requiere CSRF (cuando usa SessionAuth o dj-rest-auth)
  if (unsafe) {
    if (!getCSRFCookie()) await ensureCsrf(); // obtiene CSRF si falta
    config.headers["X-CSRFToken"] = getCSRFCookie();
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  return config;
});

export default API;

// ----------- ENDPOINTS -------------
export const getGrupoFlashcards = async () => {
  const res = await API.get("/grupoFlashcards/");
  return res.data;
};

export const createGrupoFlashcards = async (grupoFlashcards) => {
  const res = await API.post("/grupoFlashcards/", grupoFlashcards);
  return res.data;
};

export const updateGrupoFlashcards = async (id, grupoFlashcards) => {
  const res = await API.put(`/grupoFlashcards/${id}/`, grupoFlashcards);
  return res.data;
};

export const deleteGrupoFlashcards = async (id) => {
  const res = await API.delete(`/grupoFlashcards/${id}/`);
  return res.data;
};

export const getFlashcards = async (grupoId) => {
  const res = await API.get(`/grupoFlashcards/${grupoId}/flashcard/`);
  return res.data;
};

export const createFlashcards = async (flashcard) => {
  const res = await API.post("/flashcard/", flashcard);
  return res.data;
};

export const updateFlashcard = async (id, flashcard) => {
  const res = await API.put(`/flashcard/${id}/`, flashcard);
  return res.data;
};

export const deleteFlashcard = async (id) => {
  const res = await API.delete(`/flashcard/${id}/`);
  return res.data;
};
