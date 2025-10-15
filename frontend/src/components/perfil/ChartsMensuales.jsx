import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyChart = ({ resumen }) => {
  const data = resumen.map(r => ({ n: r.mes, v: r.minutos_totales }));

  return (
    <div className="stats-card">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: -10 }}>
          <XAxis dataKey="n" tick={{ fill: '#2d334a', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#2d334a', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip 
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            contentStyle={{ background: 'rgba(30, 30, 45, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', color: 'white' }} 
          />
          <Bar dataKey="v" fill="#2d334a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;

