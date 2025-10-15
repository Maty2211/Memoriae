import React from 'react';
import { Box } from '@mui/material';

const Heatmap = ({ datos }) => {
  const colores = ['#2d334a', '#3f4a8b', '#5c6ac4', '#a5b4fc', '#e0e7ff'];

  const dias = Array.from({ length: 364 }, (_, i) => {
    const d = datos[i];
    if (!d) return 0;
    return Math.min(Math.floor(d.minutos_totales / 30), 4); // de minutos a nivel de color
  });

  return (
    <div className="stats-card">
      <p className="section-title">Estadísticas diarias</p>
      <Box
        display="grid"
        gridTemplateColumns="repeat(52, 1fr)"
        gridTemplateRows="repeat(7, 1fr)"
        gap="3px"
        height="120px"
      >
        {dias.map((nivel, i) => (
          <Box key={i} sx={{ backgroundColor: colores[nivel], borderRadius: '2px', width: '100%', height: '100%' }} />
        ))}
      </Box>
    </div>
  );
};

export default Heatmap;
