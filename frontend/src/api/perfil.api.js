// en perfil.api.js

const BASE_URL = "http://127.0.0.1:8000/api/perfil";

export const obtenerEstadisticasPerfil = async () => {
  try {
    // Ya no necesitas leer de localStorage
    const res = await fetch(`${BASE_URL}/stats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // --- ¡AÑADE ESTA LÍNEA! ---
      credentials: 'include',
    });
    
    if (!res.ok) throw new Error("Error al obtener estadísticas del perfil");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};