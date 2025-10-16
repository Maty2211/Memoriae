import { ensureCsrf, getCSRFCookie } from "./csrf";

function needsCsrf(method = "GET") {
  const m = method.toUpperCase();
  return !["GET", "HEAD", "OPTIONS", "TRACE"].includes(m);
}

function hasCookie(name) {
  return document.cookie.split("; ").some((c) => c.startsWith(name + "="));
}

async function refreshToken() {
  // si no hay cookie 'refresh', no intentes refrescar
  if (!hasCookie("refresh")) return false;

  await ensureCsrf();
  const res = await fetch("/dj-rest-auth/token/refresh/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFCookie(),
    },
    body: JSON.stringify({}), // evita 415
  });
  return res.ok;
}

export async function apiFetch(url, options = {}) {
  const opts = { credentials: "include", ...options };
  const method = (opts.method || "GET").toUpperCase();

  if (needsCsrf(method)) {
    await ensureCsrf();
    opts.headers = {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
      "X-CSRFToken": getCSRFCookie(),
    };
  } else if (opts.body && !opts.headers?.["Content-Type"]) {
    opts.headers = { ...(opts.headers || {}), "Content-Type": "application/json" };
  }

  let res = await fetch(url, opts);
  if (res.status !== 401) return res;

  // 401 → solo intento refresh si ya hay cookie 'refresh'
  const ok = await refreshToken();
  if (!ok) return res;

  return fetch(url, opts);
}