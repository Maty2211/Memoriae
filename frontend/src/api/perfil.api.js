// src/components/perfil/perfil.api.js
const BASE_URL = "http://127.0.0.1:8000/api/perfil";

export const obtenerEstadisticasPerfil = async () => {
  try {
    const res = await fetch(`${BASE_URL}/stats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Token <tu_token_aqui>", // si usas token
      },
    });
    if (!res.ok) throw new Error("Error al obtener estadísticas del perfil");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
