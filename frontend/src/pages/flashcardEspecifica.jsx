import { useEffect, useState } from "react";
import { getFlashcards } from "../api/flashcard.api";
import { useParams } from "react-router-dom";
import "../estilos/flashcardEspecifica.css";

export function UsarFlashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { nombreGrupoFlashcards, idGrupoFlashcards } = useParams();
  const nombreDecod = decodeURIComponent(nombreGrupoFlashcards);

  useEffect(() => {
    mostrarFlashcard(idGrupoFlashcards);
  }, [idGrupoFlashcards]);

  useEffect(() => {
    console.log("Flashcards cargadas:", flashcards);
  }, [flashcards]);

  const mostrarFlashcard = async () => {
    try {
      const data = await getFlashcards(idGrupoFlashcards);
      setFlashcards(data || []);
      setCurrentIndex(0); // reset al abrir grupo
      setIsFlipped(false);
      console.log(flashcards);
      console.log("Data: ", data);
    } catch (err) {
      console.error("Error cargando flashcards:", err.response?.data ?? err.message);
      alert("Error cargando grupos: " + JSON.stringify(err.response?.data ?? err.message));
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false); // reset para que empiece mostrando la pregunta
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  if (flashcards.length === 0) {
    return <h3>No hay flashcards en este grupo</h3>;
  }

  const flashcard = flashcards[currentIndex];

  return (
    <div className="mainContainer">
      <div className="d-flex flex-column align-items-center mt-5"> 
          <h2 className="mb-4">{nombreDecod}</h2> 
          <div className="flashcard-container" onClick={handleFlip}>
              <button variant="secondary" onClick={handlePrev} disabled={currentIndex === 0}> 
                  <i class="bi bi-arrow-left"></i> Anterior 
              </button> 
              <div className={`flashcard-inner ${isFlipped ? "flashcard-flipped" : ""}`}>
              <div className="flashcard-front">
                  {flashcard.pregunta}
              </div>
              <div className="flashcard-back">
                  {flashcard.respuesta}
              </div>
              </div>
              <button variant="secondary" onClick={handleNext} disabled={currentIndex === flashcards.length - 1} > 
                  Siguiente <i class="bi bi-arrow-right"></i> 
              </button> 
          </div>

          <div>
            <p className="mt-3">  {currentIndex + 1} / {flashcards.length} </p> 
          </div>
      </div> 
    </div>

  );
}

