import api from "./axios";

const BASE = "/to_do_list/api/v1/tasks/";

export const getAllTasks = () => api.get(BASE);

export const getTask    = (id)   => api.get(`${BASE}${id}/`);
export const createTask = (data) => api.post(BASE, data);
//Para actualizar necesito el id y los datos nuevos
export const updateTask = (id,d) => api.put(`${BASE}${id}/`, d);
//Para eliminar necesito solo el id de la tarea
export const deleteTask = (id)   => api.delete(`${BASE}${id}/`);