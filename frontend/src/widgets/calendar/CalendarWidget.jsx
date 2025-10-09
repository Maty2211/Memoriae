import React from 'react';

// Este era el antiguo 'DummyElement'.
// Ahora es un componente modular en su propia carpeta.
const CalendarWidget = ({ title }) => (
  <div style={{ padding: '15px', background: '#2f3637ff', borderRadius: '8px', height: '100%' }}>
    <h4 style={{ margin: '0 0 5px' }}>{title}</h4>
    <p style={{ fontSize: '0.9em' }}>Placeholder para el módulo de Calendario.</p>
  </div>
);

export default CalendarWidget;