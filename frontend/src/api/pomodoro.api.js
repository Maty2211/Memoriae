import axios from "axios";

const pomodoroApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

pomodoroApi.interceptors.request.use(config => {
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

export const getCsrfToken = () => pomodoroApi.get("/api/csrf/");
export const getPomodoroSettings = () => pomodoroApi.get("/pomodoro/api/v1/settings/");
export const updatePomodoroSettings = (settings) => pomodoroApi.put("/pomodoro/api/v1/settings/", settings);
export const logPomodoroSession = (sessionData) => pomodoroApi.post("/pomodoro/api/v1/sessions/complete/", sessionData);