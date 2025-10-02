import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useAuth } from './AuthContext'; // Importamos el Hook de autenticación

// Se utiliza la variable global GridStack, cargada por CDN en index.html
const GridStack = window.GridStack;

// IMPORTACIÓN FINAL: Asumimos que este archivo está en la raíz de src/
// Nota: Debe existir el archivo frontend/src/PomodoroWidget.js
import PomodoroWidget from './PomodoroWidget'; 


// --- DUMMY WIDGET (para la otra app) ---
const DummyElement = ({ title }) => (
  <div style={{ padding: '15px', background: '#e0f7fa', borderRadius: '8px', height: '100%' }}>
    <h4 style={{ margin: '0 0 5px' }}>{title}</h4>
    <p style={{ fontSize: '0.9em' }}>Placeholder para módulo de compañera.</p>
  </div>
);

const App = () => {
    // Hooks para Gridstack y el estado del error
    const gridRef = useRef(null); 
    const [isGridReady, setIsGridReady] = useState(false);
    const [hasGridstackFailed, setGridstackFailed] = useState(false); 
    
    // CRÍTICO: Consumimos el token del AuthContext (Debe estar disponible)
    const { token, isAuthenticated } = useAuth();
    const userToken = token; 

    // Lista de Widgets
    const WIDGET_LIST = [
        { id: 'pomodoro', component: PomodoroWidget, props: {}, x: 0, y: 0, w: 4, h: 6 },
        { id: 'calendar', component: DummyElement, props: { title: "Calendario" }, x: 4, y: 0, w: 8, h: 6 },
    ];
    
    // Función que inyecta el componente React dentro del elemento DOM de Gridstack
    const renderWidget = (element, Component, props) => {
        const contentEl = document.createElement('div');
        contentEl.className = 'grid-stack-item-content';
        contentEl.style.height = '100%';
        element.appendChild(contentEl);

        const root = createRoot(contentEl);
        // Pasamos el token REAL al widget
        root.render(<Component {...props} userToken={userToken} />); 
    };

    useEffect(() => {
        // Ejecución directa de la lógica de Gridstack
        const initGridstack = () => {
            if (!window.GridStack) {
                console.error("GridStack no está definido. Fallo en la carga del CDN.");
                setGridstackFailed(true);
                return; 
            }
            
            if (gridRef.current && !isGridReady) {
                
                // 1. Inicializar Gridstack
                const grid = window.GridStack.init({
                    column: 12,
                    margin: 10,
                    float: true,
                    resizable: { autoHide: true, handles: 'all' },
                }, gridRef.current);

                // 2. Añadir los elementos al DOM y renderizar React
                WIDGET_LIST.forEach(widget => {
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

                return () => {
                    grid.destroy(false);
                };
            }
        };

        const timeout = setTimeout(initGridstack, 100); 
        return () => clearTimeout(timeout); 

    }, [isGridReady, userToken]); // Dependemos del token

    return (
        <div style={{ padding: '20px', minHeight: '100vh', background: '#f5f5f5' }}>
            <header style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#333' }}>Memoriae Dashboard</h1>
                <p style={{ fontSize: '0.8em', color: isAuthenticated ? 'green' : 'red' }}>
                    Estado: {isAuthenticated ? 'Autenticado' : 'No Autenticado'} | Token: {userToken ? 'OK' : 'Faltante'}
                </p>
            </header>

            {hasGridstackFailed && (
                <div style={{ color: 'red', textAlign: 'center', padding: '20px', border: '1px solid red' }}>
                    Error de carga: La librería Gridstack falló. Revisa el index.html y la conexión.
                </div>
            )}

            {/* Contenedor donde Gridstack montará la cuadrícula */}
            <div ref={gridRef} className="grid-stack grid-stack-12" />
        </div>
    );
};

export default App;