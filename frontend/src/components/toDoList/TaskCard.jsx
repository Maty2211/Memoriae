import { useNavigate } from "react-router-dom";
import { updateTask } from "../../api/task.api";
import { useEffect, useState } from "react";

export function TaskCard({ task }) {
  const navigate = useNavigate();
  const [done, setDone] = useState(task.done || false);

  useEffect(() => {
    setDone(task.done || false);
  }, [task.done]);

  const handleCheckbox = async (e) => {
    e.stopPropagation(); // evita que se dispare el click del card
    const newDone = !done;
    setDone(newDone);

    try {
      await updateTask(task.id, { done: newDone });
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      setDone(!newDone); // revertir si falla
    }
  };

  return (
    <div
      
      style={{
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          checked={done}
          onChange={handleCheckbox}
        />

        <div>
          <h1
            style={{
              textDecoration: done ? "line-through" : "none",
              color: done ? "gray" : "black",
              margin: 0,
              fontSize: "16px",
            }}
          >
            {task.title}
          </h1>
          <p
            style={{
              textDecoration: done ? "line-through" : "none",
              color: done ? "#888" : "#333",
              margin: 0,
              fontSize: "14px",
            }}
          >
            {task.description}
          </p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); // evita que el card navegue
          navigate("/task/" + task.id);
        }}
        style={{
          color: "black",
          background: "#f0f0f0",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        +
      </button>
    </div>
  );
}
