import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, updateTask, getTask } from "../../api/task.api";

export default function TaskFormPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
    }
    navigate("/toDoList");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTask(params.id);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      }
    }
    loadTask();
  }, [params.id, setValue]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "20px",
        boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Formulario de Tareas</h1>

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Título"
          {...register("title", { required: true })}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {errors.title && <span style={{ color: "red" }}>Este campo es requerido</span>}

        <textarea
          rows="4"
          placeholder="Descripción"
          {...register("description", { required: true })}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            resize: "vertical",
          }}
        ></textarea>
        {errors.description && <span style={{ color: "red" }}>Este campo es requerido</span>}

        <div style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#474973",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            Guardar
          </button>

          {params.id && (
            <button
              type="button"
              onClick={async () => {
                const pregunta = window.confirm("¿Estás seguro que querés eliminar esta tarea?");
                if (pregunta) {
                  await deleteTask(params.id);
                  navigate("/toDoList");
                }
              }}
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#880c78ff",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              Eliminar
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate("/toDoList")}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#5b565eff",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
