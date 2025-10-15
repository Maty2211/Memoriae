import { useNavigate } from "react-router-dom";
import { useState } from "react";


export function TaskCard({task}){
    const navigate = useNavigate();
     const [done, setDone] = useState(task.done || false);

     const handleCheckbox = (e) => {
    e.stopPropagation(); // evita que el click navegue
    setDone(!done);};

     // Aquí podrías llamar a la API para actualizar la tarea:
    // updateTask(task.id, { done: !done })

    return(
        <div 
        style={{background: "white",
            textAlign:"left",
            borderColor:"white"
        }}
            onClick={()=> {navigate("/task/"+ task.id)}}>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <hr style={{borderColor:"#00000045"}} />
        </div>
    );
}

