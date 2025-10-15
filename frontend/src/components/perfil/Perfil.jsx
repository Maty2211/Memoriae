import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Avatar } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Heatmap from "./Heatmap";
import DailyGoal from "./DailyGoal";
import WeeklyStats from "./WeeklyStats";
import MonthlyChart from "./MonthlyChart";
import "./perfil.css";

const Perfil = () => {
  // Datos simulados (más adelante vendrán del back)
  const usuario = {
    username: "@usuario01",
    nombre: "Nombre Apellido",
    streak: 12,
  };

  return (
    <Container fluid className="perfil-container">
      <Row className="justify-content-center mt-4">
        <Col md={8} className="perfil-card">
          <div className="perfil-header text-center">
            <Avatar sx={{ width: 80, height: 80, bgcolor: "#b3a6f6" }} />
            <h5 className="mt-2 text-muted">{usuario.username}</h5>
            <h4>{usuario.nombre}</h4>
            <Button
              variant="outline-secondary"
              size="sm"
              className="mt-2"
              style={{ borderRadius: "20px" }}
            >
              <Edit fontSize="small" /> Editar perfil
            </Button>
          </div>

          {/* Sección de estadísticas */}
          <div className="perfil-stats mt-5">
            <h6 className="text-center text-muted">Estadísticas diarias</h6>
            <Heatmap />

            <Row className="mt-4 text-center">
        <Col md={6}>
        <Card className="p-3 shadow-sm border-0">
        <h6 className="text-muted mb-3">Meta diaria</h6>
        <DailyGoal />
        </Card>
    </Col>

    <Col md={6}>
        <Card className="p-3 shadow-sm border-0">
        <h5 style={{ color: "#7a5cf2" }}>{usuario.streak}</h5>
        <p className="text-muted">day streak</p>
        </Card>
    </Col>
    </Row>

            <WeeklyStats />
            <MonthlyChart />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
