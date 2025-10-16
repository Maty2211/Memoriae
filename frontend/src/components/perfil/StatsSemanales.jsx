import React from 'react';

const WeeklyStats = ({ estadisticas }) => {
  const { minutos_semana_actual, minutos_semana_anterior, cambio_porcentual } = estadisticas;

  return (
    <div className="stats-card">
      <p className="section-title" style={{ color: '#f59e0b' }}>🔥 Tiempo de estudio</p>
      <p style={{ fontSize: '0.9rem', color: '#d1d5db', margin: 0 }}>
        Tu tiempo de estudio es un <strong style={{ color: cambio_porcentual < 0 ? '#f87171' : '#34d399' }}>{cambio_porcentual}%</strong> que la semana pasada.
      </p>
      <div style={{ background: 'rgba(0, 0, 0, 0.2)', borderRadius: '10px', height: '8px', marginTop: '1rem' }}>
        <div style={{ width: `${Math.min(minutos_semana_actual * 100 / (minutos_semana_anterior || 1), 100)}%`, background: 'linear-gradient(90deg, #a78bfa, #c4b5fd)', height: '8px', borderRadius: '10px' }}></div>
      </div>
      <p style={{ textAlign: 'right', color: '#d1d5db', marginTop: '0.5rem', fontSize: '0.9rem' }}>
        {Math.floor(minutos_semana_actual/60)}h {minutos_semana_actual%60}m
      </p>
    </div>
  );
};

export default WeeklyStats;