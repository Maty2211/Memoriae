import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useAuth } from './AuthContext.jsx';
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';

import WIDGET_LIST from './widgets';

const App = () => {
    const gridContainerRef = useRef(null);
    const gridInstanceRef = useRef(null);
    
    const { token, isAuthenticated } = useAuth();
    const userToken = token;

    // Esta función ahora recibe el 'grid-stack-item' completo y monta
    // el contenido de React dentro de él.
    const renderWidgetContent = (gridStackItem, Component, props) => {
        const contentEl = document.createElement('div');
        contentEl.className = 'grid-stack-item-content h-100';
        gridStackItem.appendChild(contentEl);

        const root = createRoot(contentEl);
        root.render(<Component {...props} userToken={userToken} />);
    };

    useEffect(() => {
        // Evitamos la doble inicialización causada por StrictMode
        if (gridContainerRef.current && !gridInstanceRef.current) {
            
            const grid = GridStack.init({
                column: 12,
                margin: 10,
                float: true,
                alwaysShowResizeHandle: true,
                resizable: { handles: 'se' },
            }, gridContainerRef.current);

            gridInstanceRef.current = grid;

            // --- LÓGICA MEJORADA ---
            // Ahora, 'grid.addWidget' nos devuelve el elemento del DOM que acaba de crear.
            // Usamos ese elemento directamente para renderizar el componente de React,
            // lo cual es mucho más seguro que buscarlo después.
            WIDGET_LIST.forEach(widget => {
                const widgetEl = grid.addWidget({
                    id: widget.id,
                    x: widget.x,
                    y: widget.y,
                    w: widget.w,
                    h: widget.h,
                });
                
                renderWidgetContent(widgetEl, widget.component, widget.props);
            });
        }
    }, [userToken]);

    return (
        <div className="container-fluid py-4 bg-light min-vh-100">
            <header className="text-center mb-4">
                <h1>Memoriae Dashboard</h1>
                <p className={`badge ${isAuthenticated ? 'bg-success' : 'bg-danger'}`}>
                    Estado: {isAuthenticated ? 'Autenticado' : 'No Autenticado'} | Token: {userToken ? 'OK' : 'Faltante'}
                </p>
            </header>

            <div ref={gridContainerRef} className="grid-stack grid-stack-12" />
        </div>
    );
};

export default App;

