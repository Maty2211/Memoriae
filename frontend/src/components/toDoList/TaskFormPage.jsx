import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, updateTask, getTask } from "../../api/task.api";
export default function TaskFormPage(){
    {/* Guarda los datos del hook aca */}
    const navigate = useNavigate();
    const params = useParams();
    const {register, handleSubmit, formState:{ errors},setValue} = useForm();
    const onSubmit = handleSubmit(async data => {
       if (params.id){
        await updateTask(params.id, data);
       } else{
        await createTask(data)
       }
       navigate("/toDoList");
    })
    useEffect(()=> {
        async function loadTask(){
            if (params.id){
                //Creo la funcion loadTask como async porque sino no me deja usar el await
                const res = await getTask(params.id)
                setValue("title", res.data.title)
                setValue("description", res.data.description)
            }
        }
        loadTask()
    })
    return (
        <div>
            <h1>Formulario de tareas</h1>
            <form onSubmit={onSubmit}>
                <input type="text"placeholder="title" {...register("title", {required:true})}/>
                {errors.title && <span>Este campo es requerido</span>}
                <textarea rows="3" placeholder="Description" {...register("description", {required:true})}></textarea>
                {errors.description && <span>Este campo es requerido</span>}
                <button onClick={() => navigate("/toDoList")}>Guardar</button>
            </form>
            {/* Aca pongo una condicional para que lo que los diferencia que es el :id solo me aparezca el eliminar en ese tipo de pagina */}
            {params.id && (<button onClick={async () => { 
                const pregunta = window.confirm("Estas seguro que queres eliminar esta tarea?");
                if (pregunta) {
                    await deleteTask(params.id);
                    navigate("/toDoList");
                }}}>Eliminar</button>)}
            <button type="button" onClick={() => navigate("/toDoList")}>Volver a atras</button>
        </div>
    );
}