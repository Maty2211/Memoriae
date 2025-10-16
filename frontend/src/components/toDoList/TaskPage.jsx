
import { useNavigate } from "react-router-dom";
import { TaskList } from "./TaskList";

export default function TaskPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        maxWidth: "800px",       // ancho máximo
        margin: "40px auto",     // centrado horizontal y margen superior
        padding: "20px",         // espacio interno
        backgroundColor: "white",
        borderRadius: "20px",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.45)"
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        <strong>To do list</strong>
      </h1>

      <TaskList />

      <div
        onClick={() => navigate("/task-create")}
        style={{
            textAlign: "left",
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "#33333390",
            color: "white",
            cursor: "pointer",
            width: "600px",
            margin: "auto",
            
        }}
      >
        nueva nota
      </div>
    </div>
  );
}
