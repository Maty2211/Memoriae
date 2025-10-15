import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/mascota", 
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMascota = async () => {
  const mascota = await API.get("/mascota/");
  return mascota.data;
};
