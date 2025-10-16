import { useState , useEffect } from "react";
import { createGrupoFlashcards , createFlashcards , updateGrupoFlashcards, updateFlashcard } from "../../api/flashcard.api";


export function NuevoGrupoFlashcardModal({ onSave }) {
  const [nombre, setNombre] = useState("");
  const [tema, setTema] = useState("");
  const [flashcards, setFlashcards] = useState([{ pregunta: "", respuesta: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Crear primero el grupo
      const grupoRes = await createGrupoFlashcards({ nombre, tema });
      const grupoId = grupoRes.id;

      // 2️⃣ Filtrar flashcards válidas (no vacías)
      const flashcardsValidas = flashcards.filter(
        (fc) =>
          fc.pregunta.trim() !== "" || fc.respuesta.trim() !== ""
      );

      // 3️⃣ Crear las flashcards solo si hay válidas
      let createdFlashcards = [];
      if (flashcardsValidas.length > 0) {
        const tasks = flashcardsValidas.map((fc) =>
          createFlashcards({
            pregunta: fc.pregunta,
            respuesta: fc.respuesta,
            grupo: grupoId,
          })
        );
        createdFlashcards = await Promise.all(tasks);
      }

      // 4️⃣ Notificar al componente padre
      if (onSave) onSave({ grupo: grupoRes, flashcards: createdFlashcards });

      // 5️⃣ Resetear formulario
      setNombre("");
      setTema("");
      setFlashcards([{ pregunta: "", respuesta: "" }]);
    } catch (err) {
      console.error("Error al guardar:", err);
      const message = err.response?.data ?? err.message;
      alert("Error guardando: " + JSON.stringify(message));
    }
  };

  const addFlashcardField = () => {
    setFlashcards([...flashcards, { pregunta: "", respuesta: "" }]);
  };

  const handleFlashcardChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  return (
    <div
      className="modal fade"
      id="flashcardModal"
      tabIndex="-1"
      aria-labelledby="flashcardModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="flashcardModalLabel" style={{fontFamily: "Pixelify Sans, sans-serif"}}>
              Crear Grupo de Flashcards
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre del Grupo</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tema</label>
                <input
                  type="text"
                  className="form-control"
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  required
                />
              </div>

              {flashcards.map((fc, index) => (
                <div key={index} className="mb-3">
                  <label className="form-label">Pregunta</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fc.pregunta}
                    onChange={(e) =>
                      handleFlashcardChange(index, "pregunta", e.target.value)
                    }
                  />

                  <label className="form-label">Respuesta</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fc.respuesta}
                    onChange={(e) =>
                      handleFlashcardChange(index, "respuesta", e.target.value)
                    }
                  />
                </div>
              ))}

              <button
                type="button"
                className="btn boton-modal btn-secondary"
                onClick={addFlashcardField}
                style={{
                  margin: "4px",
                  fontFamily: "Pixelify Sans, sans-serif",
                  backgroundColor: "#D7DBF9",
                  border: "1px solid #D7DBF9",
                  color: "#3B3D53",
                  borderRadius: "60px",
                }}
              >
                + Agregar otra pregunta
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                style={{
                  margin: "4px",
                  fontFamily: "Pixelify Sans, sans-serif",
                  backgroundColor: "#D7DBF9",
                  border: "1px solid #D7DBF9",
                  color: "#3B3D53",
                  borderRadius: "60px",
                }}
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export function EditarGrupoFlashcardModal({ grupo, onUpdate }) {
  const [nombre, setNombre] = useState("");
  const [tema, setTema] = useState("");
  const [flashcards, setFlashcards] = useState([]);


  useEffect(() => {
    if (grupo) {
      setNombre(grupo.nombre);
      setTema(grupo.tema);
      setFlashcards(grupo.flashcards || []);
    }
  }, [grupo]);

  const handleFlashcardChange = (id, field, value) => {
    const updated = flashcards.map(fc =>
      fc.id === id ? { ...fc, [field]: value } : fc
    );
    setFlashcards(updated);
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    for (const fc of flashcards) {
      if (fc.id) {
        await updateFlashcard(fc.id, fc);
      } else {
        await createFlashcards({ ...fc, grupo: grupo.id });
      }
    }

    const grupoActualizado = await updateGrupoFlashcards(grupo.id, {
      nombre,
      tema,
      flashcards,
    });

    if (onUpdate) onUpdate(grupoActualizado);
  } catch (err) {
    console.error("Error al actualizar grupo:", err);
    alert("No se pudo guardar los cambios");
  }
};


  const addFlashcardField = () => {
    setFlashcards([...flashcards, { pregunta: "", respuesta: "" }]);
  };

  return (
    <div
      className="modal fade"
      id="editarGrupoModal"
      tabIndex="-1"
      aria-labelledby="editarGrupoModalLabel"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editarGrupoModalLabel" style={{fontFamily: "Pixelify Sans, sans-serif"}}>
              Editar Grupo de Flashcards
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre || ""}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tema</label>
                <input
                  type="text"
                  className="form-control"
                  value={tema || ""}
                  onChange={(e) => setTema(e.target.value)}
                />
              </div>

              <h6>Flashcards</h6>
              {flashcards.map((fc, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Pregunta"
                    value={fc.pregunta || ""}
                    onChange={(e) => handleFlashcardChange(fc.id, "pregunta", e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Respuesta"
                    value={fc.respuesta || ""}
                    onChange={(e) => handleFlashcardChange(fc.id, "respuesta", e.target.value)}
                  />
                </div>
              ))}

              
              <button type="button" 
                      className="btn btn-secondary" 
                      onClick={addFlashcardField}
                      style={{ margin: "4px", fontFamily: "Pixelify Sans, sans-serif", backgroundColor: "#D7DBF9", border: "1px solid #D7DBF9", color: "#3B3D53", borderRadius:"60px" }}
                      >
                + Agregar otra pregunta
              </button>

              <button type="submit" 
                      className="btn btn-primary" 
                      data-bs-dismiss="modal"
                      style={{ margin: "4px", fontFamily: "Pixelify Sans, sans-serif", backgroundColor: "#D7DBF9", border: "1px solid #D7DBF9", color: "#3B3D53", borderRadius:"60px" }}
                      >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}