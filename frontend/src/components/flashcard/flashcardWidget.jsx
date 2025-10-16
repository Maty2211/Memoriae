import { useState, useEffect } from 'react';
import { getGrupoFlashcards } from '../../api/flashcard.api';
import { useNavigate } from 'react-router-dom';
import './estilos/flashcardWidget.css';

export function FlashcardWidget({navigate}) {
  const [grupos, setGrupos] = useState([]);
  const [indice, setIndice] = useState(0);

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
    return <div className="widget-fc-container">Cargando grupos...</div>;
  }

  const grupoActual = grupos[indice];

  return (
    <div className="widget-fc-container">
      <button className="flecha" onClick={anterior}>
        <i className="bi bi-chevron-left"></i>
      </button>
      <div className="widget-fc-cuadro widget-fc-contenido">
        <div className="widget-header flashcard-widget" >
          <div className='titulo'>{grupoActual.nombre}</div>
          <div className='tema'>{grupoActual.tema}</div>
        </div>
      </div>
          <button 
            className="irLista"
            onClick={() => navigate('/flashcards')}
          >
            <i className="bi bi-textarea-resize"></i>
          </button>

      <button className="flecha" onClick={siguiente}>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default FlashcardWidget;


