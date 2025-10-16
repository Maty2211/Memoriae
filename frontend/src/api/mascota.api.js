import api from './axios'; // Usamos la instancia de Axios centralizada

/**
 * --- FUNCIONES PARA INTERACTUAR CON EL MÓDULO DE MASCOTA ---
 */

/**
 * Obtiene los datos de la mascota del usuario logueado.
 * Corresponde a: GET /mascota/actualizar/
 */
export const getMascota = () => api.get(`/mascota/actualizar/`);

/**
 * Actualiza el estado de la mascota basado en las horas de estudio.
 * Corresponde a: POST /mascota/actualizar/
 * @param {number} horas_estudio - La cantidad de horas de estudio a registrar.
 */
export const updateMascotaEstado = (horas_estudio) => api.post(`/mascota/actualizar/`, { horas_estudio });

/**
 * Permite al usuario comprar un accesorio para su mascota.
 * Corresponde a: POST /mascota/comprar/<int:accesorio_id>/
 * @param {number} accesorioId - El ID del accesorio que se quiere comprar.
 */
export const comprarAccesorio = (accesorioId) => api.post(`/mascota/comprar/${accesorioId}/`);