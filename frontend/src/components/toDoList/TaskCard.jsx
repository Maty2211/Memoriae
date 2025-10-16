import { useNavigate } from "react-router-dom";
import { updateTask } from "../../api/task.api";
import { useEffect, useRef, useState } from "react";

export function TaskCard({ task }) {
  const navigate = useNavigate();
  if (!task) return null; // o un skeleton
  const [done, setDone] = useState(!!task.done);
  const [saving, setSaving] = useState(false);
  const mounted = useRef(true);
  
  useEffect(() => {
    setDone(!!task.done);
  }, [task.id]);

  const handleCheckbox = async (e) => {
    if (saving) return;            // evita carreras
    e.stopPropagation();
    const checked = e.target.checked;
    setDone(checked);
    setSaving(true);
    try {
         // PATCH parcial: solo el campo cambiado
      const { data } = await updateTask(task.id, { done: checked });
      setDone(!!data.done); 
    } catch (err) {
      setDone(!checked);                   // revierte
      console.error("Update failed:", err);
    }finally {
      setSaving(false);
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
          disabled={saving}   
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