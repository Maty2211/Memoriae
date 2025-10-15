import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/mascota", 
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMensaje = async () => {
  const mascota = await API.get("/mascota/");
  return mascota.data.mensajes;
};

export const getEstado = async (mascotaId) => {
  const mascota = await API.get("/mascota/", mascotaId);
  return mascota.data.estado;
};