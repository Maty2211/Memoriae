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

  const loadGrupoFlashcards = async () => {
    try {
      const data = await getGrupoFlashcards();
      setGrupoFlashcards(data);
      console.log(data)
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
    <div>
      <div className='listaGrupos'>
        {grupoFlashcards.map((gf, index) => (

        <Link to={`/flashcards/${gf.id}/${encodeURIComponent(gf.nombre)}`}>
          <div key={index} className='grupoFlashcard'>
            <div className='texto'>
            {gf.nombre} <br/> {gf.tema}
            </div>
            <div className='icono'>
              <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(gf.id)}>
                🗑️
              </button>
              <button className="btn btn-warning btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#editarGrupoModal" onClick={() => setGrupoSeleccionado(gf)}>
                ✏️
              </button>
            </div>
          </div>
        </Link>
        ))}
      </div>

      <div className="container mt-4">
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#flashcardModal">
          Crear nuevo grupo
        </button>

        <NuevoGrupoFlashcardModal onSave={handleSave} />
        <EditarGrupoFlashcardModal 
          grupo={grupoSeleccionado} 
          onUpdate={(updated) => {
            setGrupoFlashcards(grupoFlashcards.map(gf => 
              gf.id === updated.id ? updated : gf
            ));
          }}
        />
      </div>
    </div>
  );
}


