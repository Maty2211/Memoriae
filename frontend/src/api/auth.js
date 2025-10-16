import { apiFetch } from "./client";

const BASE = ""; // con el proxy de Vite va vacío

function throwIfNotOk(res) {
  if (res.ok) return res;
  const err = new Error(`HTTP ${res.status}`);
  err.status = res.status;
   // dejo un promise en err.json para que el componente pueda leer el detalle del backend
  err.json = res.json().catch(() => ({}));
  throw err;
}

export async function register({ email, username, password1, password2, nombre = "", apellido = "" }) {
  const body = { email, username, password1, password2, nombre, apellido };

  const res = await apiFetch(`/dj-rest-auth/registration/`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const details = await res.json().catch(() => ({}));
    const err = new Error("Registro falló");
    err.details = details;
    throw err;
  }
  return res.json();
}

export async function login({ email, password }) {
  const res = await apiFetch(`${BASE}/dj-rest-auth/login/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  await throwIfNotOk(res);
  return res.json(); // cookies JWT quedan seteadas por el backend
}

export async function logout() {
  const res = await apiFetch(`${BASE}/dj-rest-auth/logout/`, {
    method: "POST",
    body: JSON.stringify({}), // evita 415
  });
  await throwIfNotOk(res);
}

export async function me() {
  const res = await apiFetch(`${BASE}/dj-rest-auth/user/`);
  // al inicio todavía no estás logueado, así que puede venir 401 o 403
  if (res.status === 401 || res.status === 403) return null;
  if (!res.ok) throw new Error("Error obteniendo usuario");
  return res.json();
}