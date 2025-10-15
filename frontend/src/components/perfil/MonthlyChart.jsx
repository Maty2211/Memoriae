import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "react-bootstrap";

const data = [
  { mes: "Ene", minutos: 120 },
  { mes: "Feb", minutos: 240 },
  { mes: "Mar", minutos: 180 },
  { mes: "Abr", minutos: 200 },
  { mes: "May", minutos: 150 },
  { mes: "Jun", minutos: 90 },
  { mes: "Jul", minutos: 210 },
  { mes: "Ago", minutos: 300 },
  { mes: "Sep", minutos: 260 },
  { mes: "Oct", minutos: 190 },
  { mes: "Nov", minutos: 220 },
  { mes: "Dic", minutos: 160 },
];

const MonthlyChart = () => {
  return (
    <Card className="p-3 mt-4 shadow-sm border-0">
      <h6 className="text-center text-muted mb-3">Progreso mensual</h6>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="minutos" fill="#7a5cf2" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyChart;
