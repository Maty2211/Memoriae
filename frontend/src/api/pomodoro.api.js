import axios from 'axios';

const pomodoroApi = axios.create({
    baseURL: 'http://localhost:8000/pomodoro/'  
});

// Interceptor para añadir el token de autenticación a cada petición
pomodoroApi.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        // Django REST Framework espera este formato
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const getPomodoroSettings = () => pomodoroApi.get('settings/');

export const updatePomodoroSettings = (settings) => pomodoroApi.put('settings/', settings);

export const logPomodoroSession = (sessionData) => pomodoroApi.post('sessions/complete/', sessionData);
