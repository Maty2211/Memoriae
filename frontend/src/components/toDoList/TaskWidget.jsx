import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getAllTasks } from "../../api/task.api";

export default function MiniTaskWidget({ navigate }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const res = await getAllTasks();
        setTasks(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error cargando tareas:", err);
      }
    }
    loadTasks();
  }, []);

  return (
    <Card
      style={{
        maxHeight: "100%",
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Card.Header
        style={{
          backgroundColor: "#161b33",
          color: "white",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
      To do list
      </Card.Header>

      <Card.Body style={{ padding: "10px" }}>
        {tasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            No hay tareas pendientes!
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tasks.map((t) => (
              <li
                key={t.id}
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "4px",
                  marginBottom: "6px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/task/" + t.id)} // 👈 aquí usamos "t"
              >
                <strong>{t.title}</strong>
                <br />
                <span
                  style={{
                    fontSize: "13px",
                    color: "#555",
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.description || "Sin descripción"}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            style={{ backgroundColor: "#161b33", color: "white" }}
            size="sm"
            onClick={() => navigate("/toDoList")}
          >
            Ver todas
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
