import api from "./axios";

const BASE = "/calendario/api/v1/calendario/";

export const getAllEvents = () => api.get(BASE);
export const createEvent = (event) => api.post(BASE, event);
export const deleteEvent = (id) => api.delete(`${BASE}${id}/`);
export const updateEvent = (id, event) => api.put(`${BASE}${id}/`, event);
export const getEvent = (id) => api.get(`${BASE}${id}/`);