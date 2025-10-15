import { useEffect, useState } from "react";
import { getGrupoFlashcards, deleteGrupoFlashcards } from "../../api/flashcard.api";
import { NuevoGrupoFlashcardModal, EditarGrupoFlashcardModal } from "./grupoFlashcardModal";
import { Link } from 'react-router-dom'
import './estilos/flashcards.css'

export function ListarGrupoFlashcards() {
  const [grupoFlashcards, setGrupoFlashcards] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

  useEffect(() => {
    loadGrupoFlashcards();
  }, []);

  const loadGrupoFlashcards = async () => {
    try {
      const data = await getGrupoFlashcards();
      setGrupoFlashcards(data);
    } catch (err) {
      console.error("Error cargando flashcards:", err.response?.data ?? err.message);
      alert("Error cargando grupos: " + JSON.stringify(err.response?.data ?? err.message));
    }
  };

  const handleSave = (created) => {
    if (created?.grupo) {
      setGrupoFlashcards((prev) => [created.grupo, ...prev]);
    } else {
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
          <div className="principal-fc">
          <div className="botonContainer">
            <button className="nuevoGrupoBoton" data-bs-toggle="modal" data-bs-target="#flashcardModal">
              Nueva Flashcard
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
          
          <div className='listaGrupos'>
            {grupoFlashcards.map((gf) => (
              <Link className="card" key={gf.id} to={`/flashcards/${gf.id}/${encodeURIComponent(gf.nombre)}`}>
                <div className='grupoFlashcard'>
                  <div className='titulo'>
                    {gf.nombre}
                  </div>
                  <div className='tema'>
                    {gf.tema}
                  </div>
                  <div className='icono'>
                    <button 
                      className="botones-fc" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(gf.id);
                      }}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                    <button 
                      className="botones-fc" 
                      data-bs-toggle="modal" 
                      data-bs-target="#editarGrupoModal" 
                      onClick={(e) => {
                        e.preventDefault();
                        setGrupoSeleccionado(gf);
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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


