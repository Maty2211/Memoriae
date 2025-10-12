import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/flashcard", 
  headers: {
    "Content-Type": "application/json",
  },
});

export const getGrupoFlashcards = async () => {
  const res = await API.get("/grupoFlashcards/");
  return res.data;
};

export const createGrupoFlashcards = async (grupoFlashcards) => {
  const res = await API.post("/grupoFlashcards/", grupoFlashcards);
  return res.data;
};

export const updateGrupoFlashcards = async (id, grupoFlashcards) => {
  const res = await API.put(`/grupoFlashcards/${id}/`, grupoFlashcards);
  return res.data;
};

export const deleteGrupoFlashcards = async (id) => {
  const res = await API.delete(`/grupoFlashcards/${id}/`);
  return res.data;
};

export const getFlashcards = async (grupoId) => {
  const res = await API.get(`/grupoFlashcards/${grupoId}/flashcard/`);
  return res.data;
};

export const createFlashcards = async (flashcard) => {
  const res = await API.post("/flashcard/", flashcard);
  return res.data;
};