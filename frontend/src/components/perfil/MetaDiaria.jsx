import React from 'react';
import { Stack, Avatar } from '@mui/material';

const DailyGoal = () => {
  const dias = ["L", "M", "M", "J", "V", "S", "D"];
  const completados = [true, true, false, true, true, true, false];

  return (
    <div className="stats-card">
      <p className="section-title" style={{ color: '#000' }}>Meta diaria</p>
      <Stack direction="row" justifyContent="space-between" alignItems="center" height="100%">
        {dias.map((dia, i) => (
          <Avatar
            key={i}
            sx={{
              bgcolor: completados[i] ? '#4b4b4b' : 'rgba(0,0,0,0.1)',
              border: `2px solid ${completados[i] ? '#000000' : '#999999'}`,
              color: '#ffffff',
              width: 38,
              height: 38,
              fontSize: '0.9rem',
            }}
          >
            {dia}
          </Avatar>
        ))}
      </Stack>
    </div>
  );
};

export default DailyGoal;