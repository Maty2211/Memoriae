import { useEffect, useState } from "react";
import { getFlashcards } from "../api/flashcard.api";
import { useParams } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { Button } from "react-bootstrap";

export function UsarFlashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { nombreGrupoFlashcards, idGrupoFlashcards } = useParams();
  const nombreDecod = decodeURIComponent(nombreGrupoFlashcards);

  useEffect(() => {
    mostrarFlashcard(idGrupoFlashcards);
  }, [idGrupoFlashcards]);

  const mostrarFlashcard = async () => {
    try {
      const data = await getFlashcards(idGrupoFlashcards);
      setFlashcards(data.flashcard || []);
      setCurrentIndex(0); // reset al abrir grupo
      setIsFlipped(false);
      console.log(flashcards);
      console.log(data);
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
    <div className="d-flex flex-column align-items-center mt-5">
      <h2 className="mb-4">{nombreDecod}</h2>

      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          key="front"
          className="card p-5 text-center shadow"
          style={{ width: "400px", height: "250px", cursor: "pointer" }}
          onClick={handleFlip}
        >
          <h4>{flashcard.pregunta}</h4>
        </div>

        <div
          key="back"
          className="card p-5 text-center shadow bg-light"
          style={{ width: "400px", height: "250px", cursor: "pointer" }}
          onClick={handleFlip}
        >
          <h4>{flashcard.respuesta}</h4>
        </div>
      </ReactCardFlip>

      <div className="d-flex justify-content-between w-50 mt-4">
        <Button variant="secondary" onClick={handlePrev} disabled={currentIndex === 0}>
          ⬅️ Anterior
        </Button>
        <Button
          variant="secondary"
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
        >
          Siguiente ➡️
        </Button>
      </div>

      <p className="mt-3">
        Flashcard {currentIndex + 1} de {flashcards.length}
      </p>
    </div>
  );
}

