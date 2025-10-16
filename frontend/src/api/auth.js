import api from "./axios";

export async function register({ email, username, password1, password2, nombre = "", apellido = "" }) {
  const body = { email, username, password1, password2, nombre, apellido };
  try {
    const response = await api.post(`/dj-rest-auth/registration/`, body);
    return response.data;
  } catch (error) {
    const err = new Error("Registro falló");
    err.details = error.response?.data || {};
    throw err;
  }
}

export async function login({ email, password }) {
  const response = await api.post(`/dj-rest-auth/login/`, { email, password });
  return response.data; // Las cookies se setean automáticamente
}

export async function logout() {
  const response = await api.post(`/dj-rest-auth/logout/`, {});
  return response.data;
}

export async function me() {
  try {
    const response = await api.get(`/dj-rest-auth/user/`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return null; // Comportamiento esperado, no es un error real.
    }
    throw new Error("Error obteniendo usuario");
  }
}