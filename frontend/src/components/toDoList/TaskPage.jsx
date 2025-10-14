import { useNavigate } from "react-router-dom"
import { TaskList } from "./TaskList";
export default function TaskPage(){
    const navigate = useNavigate();
    return (
        <div>
            <h1>Listado de tareas</h1>
            <TaskList/>
            <button type="button" onClick={() => navigate("/task-create")}>crear tarea</button>
        </div>
    )
}