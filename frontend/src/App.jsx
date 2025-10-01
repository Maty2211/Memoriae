import { HashRouter , Routes , Route } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Se utiliza la variable global GridStack, cargada por CDN en index.html
const GridStack = window.GridStack;

// Asumimos que el archivo de tu componente Pomodoro se llama PomodoroWidget.js
// y se encuentra en /src/components/
import PomodoroWidget from './components/PomodoroWidget.js'; 


// Token simulado para desarrollo (DEBE SER REEMPLAZADO por el JWT real de django-rest-auth)
const MOCK_USER_TOKEN = 'your_actual_jwt_token_here'; 

// --- DUMMY WIDGET (para probar el layout) ---
const DummyElement = ({ title }) => (
  <div style={{ padding: '15px', background: '#e0f7fa', borderRadius: '8px', height: '100%' }}>
    <h4 style={{ margin: '0 0 5px' }}>{title}</h4>
    <p style={{ fontSize: '0.9em' }}>Placeholder para módulo de compañera.</p>
  </div>
);

const App = () => {
    const gridRef = useRef(null); 
    const [isGridReady, setIsGridReady] = useState(false);
    
    // Función para inyectar un componente de React en un elemento del DOM
    const renderWidget = (element, Component, props) => {
        const contentEl = document.createElement('div');
        contentEl.className = 'grid-stack-item-content';
        contentEl.style.height = '100%';
        element.appendChild(contentEl);

        const root = createRoot(contentEl);
        root.render(<Component {...props} />);
    };

    useEffect(() => {
        if (gridRef.current && !isGridReady && window.GridStack) {
            
            // 1. Inicializar Gridstack
            const grid = window.GridStack.init({
                column: 12,
                margin: 10,
                float: true,
                resizable: { autoHide: true, handles: 'all' },
            }, gridRef.current);

            // 2. Definición de Widgets con sus posiciones iniciales
            const widgets = [
                // Widget 1: Pomodoro (Tu Módulo)
                { id: 'pomodoro', component: PomodoroWidget, props: { userToken: MOCK_USER_TOKEN }, x: 0, y: 0, w: 4, h: 6 },
                // Widget 2: Calendario (Placeholder)
                { id: 'calendar', component: DummyElement, props: { title: "Calendario" }, x: 4, y: 0, w: 8, h: 6 },
            ];
            
            // 3. Añadir los elementos al DOM y renderizar React
            widgets.forEach(widget => {
                const el = document.createElement('div');
                el.className = 'grid-stack-item';
                el.setAttribute('gs-id', widget.id);
                el.setAttribute('gs-x', widget.x);
                el.setAttribute('gs-y', widget.y);
                el.setAttribute('gs-w', widget.w);
                el.setAttribute('gs-h', widget.h);

                grid.addWidget(el);
                renderWidget(el, widget.component, widget.props);
            });

            setIsGridReady(true);
            
            // Función de limpieza para destruir Gridstack al desmontar el componente
            return () => {
                grid.destroy(false);
            };
        }
    }, [isGridReady]); 

    return (
        <div style={{ padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
                Memoriae Dashboard
            </h1>
            {/* Contenedor donde Gridstack montará la cuadrícula */}
            <div ref={gridRef} className="grid-stack grid-stack-12" />
        </div>
    );
}

export default App;