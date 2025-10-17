import api from './axios'; // Usamos la instancia de Axios centralizada

// Las rutas deben ser STRINGS (cadenas de texto), no literales de expresión regular
export const getMascota = () => api.get('/mascota/actualizar/'); 

/**
 * @param {number} horas_estudio 
 */
export const updateMascotaEstado = (horas_estudio) => api.post('/mascota/actualizar/', { horas_estudio });

/**
 * @param {number} accesorioId 
 */
// Usar comillas simples o backticks para el string de la URL
export const comprarAccesorio = (accesorioId) => api.post(`/mascota/comprar/${accesorioId}/`); 

export const actualizarMonedas = () => api.post('/mascota/actualizar-monedas/');