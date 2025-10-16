const BASE_URL = "/api/perfil";

export const obtenerEstadisticasPerfil = async () => {
  try {
    const res = await fetch(`${BASE_URL}/stats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`El servidor respondió con el estado: ${res.status}`);
    }

    return await res.json();
    
  } catch (err) {
    console.error("Error al obtener las estadísticas del perfil:", err);
    return null;
  }
};