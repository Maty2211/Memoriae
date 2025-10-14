// Lee la cookie 'csrftoken'. Devuelve "" si no existe.
export function getCSRFCookie() {
  return document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/)?.[1] ?? "";
}

// Evita múltiples GET /api/csrf/ en paralelo
let csrfPromise = null;

/**
 * Asegura que la cookie 'csrftoken' exista.
 * Llama a /api/csrf/ (relativo) con credentials: 'include' para que el backend la setee.
 */
export async function ensureCsrf() {
  if (getCSRFCookie()) return; // ya la tengo

  if (!csrfPromise) {
    csrfPromise = fetch("/api/csrf/", { credentials: "include" })
      .catch(() => {})          // opcional: no romper si falla
      .finally(() => { csrfPromise = null; });
  }
  await csrfPromise;
}