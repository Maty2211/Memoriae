import { useState, useEffect } from 'react';
import { getGrupoFlashcards } from '../api/flashcard.api';
import { useNavigate } from 'react-router-dom';
import '../estilos/flashcardWidget.css';

export function FlashcardWidget() {
  const [grupos, setGrupos] = useState([]);
  const [indice, setIndice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    cargarGrupos();
  }, []);

  const cargarGrupos = async () => {
    try {
      const data = await getGrupoFlashcards();
      setGrupos(data);
    } catch (err) {
      console.error("Error cargando grupos:", err);
    }
  };

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % grupos.length);
  };

  const anterior = () => {
    setIndice((prev) => (prev - 1 + grupos.length) % grupos.length);
  };

  if (grupos.length === 0) {
    return <div className="widget-container">Cargando grupos...</div>;
  }

  const grupoActual = grupos[indice];

  return (
    <div className="widget-container">
      <button className="flecha" onClick={anterior}>◀</button>
      <div className="widget-cuadro">
        <div className="widget-header flashcard-widget" >
          <h4>{grupoActual.nombre}</h4>
          {/* Botón arriba a la derecha */}
          <button 
            className="ir-lista"
            onClick={() => navigate('/flashcards')}
          >
            📂
          </button>
        </div>
        <p>{grupoActual.tema}</p>
      </div>

      <button className="flecha" onClick={siguiente}>▶</button>
    </div>
  );
}
