import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/calendario/api/v1/calendario/'
});

export const getAllEvents = () => api.get('/');

export const createEvent = (event) => api.post('/', event);

export const deleteEvent = (id) => api.delete(`/${id}/`);

export const updateEvent = (id, event) => api.put(`/${id}/`, event);

export const getEvent = (id) => api.get(`/${id}/`);
