import { useEffect, useState } from "react";
import { getGrupoFlashcards, deleteGrupoFlashcards } from "../api/flashcard.api";
import { NuevoGrupoFlashcardModal, EditarGrupoFlashcardModal } from "./grupoFlashcardModal";
import { Link } from 'react-router-dom'
import '../estilos/flashcards.css'

export function ListarGrupoFlashcards() {
  const [grupoFlashcards, setGrupoFlashcards] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

  useEffect(() => {
    loadGrupoFlashcards();
  }, []);

    useEffect(() => {
    console.log("Nuevo estado grupoFlashcards:", grupoFlashcards);
  }, [grupoFlashcards]);

  const loadGrupoFlashcards = async () => {
    try {
      const data = await getGrupoFlashcards();
      setGrupoFlashcards(data);
      console.log(data);
    } catch (err) {
      console.error("Error cargando flashcards:", err.response?.data ?? err.message);
      alert("Error cargando grupos: " + JSON.stringify(err.response?.data ?? err.message));
    }
  };

  const handleSave = (created) => {
    // created puede ser { grupo, flashcards } según el onSave que pasamos arriba
    if (created?.grupo) {
      // añadimos el nuevo grupo al estado para que aparezca sin recargar
      setGrupoFlashcards((prev) => [created.grupo, ...prev]);
    } else {
      // si onSave recibió un solo objeto, recargamos la lista
      loadGrupoFlashcards();
    }
  };

  const handleDelete = async (id) => {
  try {
    await deleteGrupoFlashcards(id);
    setGrupoFlashcards(grupoFlashcards.filter((gf) => gf.id !== id));
  } catch (err) {
    console.error("Error al eliminar:", err);
  }

};

  return (
      <div className="mainContainer">
        <div className="botonContainer">
          <button className="nuevoGrupoBoton" data-bs-toggle="modal" data-bs-target="#flashcardModal">
            Nueva Flashcard
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
        
        <div className='listaGrupos'>
          {grupoFlashcards.map((gf) => (
            <Link key={gf.id} to={`/flashcards/${gf.id}/${encodeURIComponent(gf.nombre)}`}>
              <div className='grupoFlashcard'>
                <div className='texto'>
                  {gf.nombre} <br/> {gf.tema}
                </div>
                <div className='icono'>
                  <button 
                    className="botonesFC" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(gf.id);
                    }}
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                  <button 
                    className="botonesFC" 
                    data-bs-toggle="modal" 
                    data-bs-target="#editarGrupoModal" 
                    onClick={(e) => {
                      e.preventDefault();
                      setGrupoSeleccionado(gf);
                    }}
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

      <div className="modales">
          <NuevoGrupoFlashcardModal onSave={handleSave} />
          <EditarGrupoFlashcardModal
            grupo={grupoSeleccionado}
            onUpdate={(updated) => {
              setGrupoFlashcards((prev) =>
                prev.map((gf) => (gf.id === updated.id ? updated : gf))
              );
            }}
          />
      </div>

      </div>
  );
}


