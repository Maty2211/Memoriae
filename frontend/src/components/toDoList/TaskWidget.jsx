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
    <div
      style={{
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.334),inset 0 0 0 1px rgba(248, 245, 245, 0)",
        padding: "10px",
        borderRadius: "20px"
      }}
    >
      {/* Contenedor borroso con título y botón */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 5px",
          backgroundColor: "rgba(22, 27, 51, 0)",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <h5 style={{ margin: 0 , fontSize: "18px"}}>To do list</h5>
        </div>
        

      {/* Card con lista de tareas */}
      <Card
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
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
                    textAlign: "left",
                  }}
                  
                >
                <span style={{
                    textDecoration: t.done ? "line-through" : "none",
                    color: t.done ? "gray" : "black"
                  }}
                  >
                  {t.title}
                </span>
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
        </Card.Body>
      </Card>

      <div
          style={{
          display: "flex",          // importante para que funcione justifyContent
           justifyContent: "flex-end", // lo alinea a la derecha
            marginTop: "2px",
            padding: "5px 10px",
            marginBottom: "0px",
            cursor: "pointer",
          }}>
        <div
          style={{ backgroundColor: "transparent", color: "white" }}
          size="sm"
          onClick={() => navigate("/toDoList")}
        >
          <i className="bi bi-textarea-resize"></i>
        </div>
      </div>
    </div>
  );
}