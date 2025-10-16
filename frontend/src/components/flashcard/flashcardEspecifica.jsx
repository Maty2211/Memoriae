import { useEffect, useState } from "react";
import { getFlashcards } from "../../api/flashcard.api";
import { useNavigate, useParams } from "react-router-dom";
import "./estilos/flashcardEspecifica.css";

export function UsarFlashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const { nombreGrupoFlashcards, idGrupoFlashcards } = useParams();
  const nombreDecod = decodeURIComponent(nombreGrupoFlashcards);

  useEffect(() => {
    mostrarFlashcard(idGrupoFlashcards);
  }, [idGrupoFlashcards]);

  const mostrarFlashcard = async () => {
    try {
      const data = await getFlashcards(idGrupoFlashcards);
      setFlashcards(data || []);
      setCurrentIndex(0); 
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
      setIsFlipped(false);
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
      <div className="principal-fc-blur">
          <div className="titulo-fc">
            <i className="bi bi-arrow-left" onClick={() => navigate('/flashcards')}></i>
            <h2 className="mb-4">{nombreDecod}</h2>
          </div>
        <div className="d-flex flex-column align-items-center mt-5"> 
            <div className="flashcard-container" onClick={handleFlip}>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                disabled={currentIndex === 0}
                className="arrow-left"
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              <div className={`flashcard-inner ${isFlipped ? "flashcard-flipped" : ""}`}>
                <div className="flashcard-front pregunta">
                  {flashcard.pregunta}
                </div>
                <div className="flashcard-back respuesta">
                  {flashcard.respuesta}
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                disabled={currentIndex === flashcards.length - 1}
                className="arrow-right"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>

            <div className="indice">
              <p className="mt-3">  {currentIndex + 1} / {flashcards.length} </p> 
            </div>
        </div> 
      </div>
    </div>

  );
};

export default UsarFlashcard