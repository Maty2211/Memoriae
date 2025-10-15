import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import Heatmap from "./Heatmap.jsx";
import DailyGoal from "./MetaDiaria.jsx";
import WeeklyStats from "./StatsSemanales.jsx";
import MonthlyChart from "./ChartsMensuales.jsx";
import { obtenerEstadisticasPerfil } from "../../api/perfil.api.js";
import "./perfil.css";

const Perfil = () => {
  const [usuario, setUsuario] = useState({
    username: "@usuario01",
    nombre: "Nombre Apellido",
    streak: 0,
  });

  const [datosPerfil, setDatosPerfil] = useState(null);

  useEffect(() => {
    obtenerEstadisticasPerfil().then(data => {
      if (data) {
        setDatosPerfil(data);
        setUsuario(prev => ({ ...prev, streak: data.racha_de_dias }));
      }
    });
  }, []);

  if (!datosPerfil) return <p>Cargando estadísticas...</p>;

  return (
    <div className="perfil-grid-container">
      <div className="grid-header">
        <Avatar sx={{ width: 60, height: 60, bgcolor: "#b3a6f6" }} />
        <h5 className="mt-1 text-muted">{usuario.username}</h5>
        <h4>{usuario.nombre}</h4>
      </div>

      <div className="grid-heatmap">
        <div className="card-effect">
          <Heatmap datos={datosPerfil.datos_heatmap} />
        </div>
      </div>

      <div className="grid-meta-diaria">
        <div className="card-effect">
          <DailyGoal estadoMeta={datosPerfil.estado_meta_diaria} />
        </div>
      </div>

      <div className="grid-racha-dias">
        <div className="card-effect centered-content">
          <h5 className="racha-numero">{usuario.streak}</h5>
          <p className="text-muted mb-0">day streak</p>
        </div>
      </div>

      <div className="grid-semanal">
        <div className="card-effect">
          <WeeklyStats estadisticas={datosPerfil.estadisticas_semanales} />
        </div>
      </div>

      <div className="grid-mensual">
        <div className="card-effect">
          <MonthlyChart resumen={datosPerfil.resumen_mensual} />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
