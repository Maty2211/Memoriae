import React from "react";
import { Card } from "react-bootstrap";

const WeeklyStats = () => {
  return (
    <Card className="p-3 mt-4 shadow-sm border-0 text-center">
      <h6 style={{ color: "#f57c00" }}>Tiempo de estudio</h6>
      <p className="text-muted">
        Tu tiempo de estudio es un <strong>20% más bajo</strong> que la semana pasada.
      </p>
    </Card>
  );
};

export default WeeklyStats;
