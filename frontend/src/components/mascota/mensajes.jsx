import { useEffect, useState } from "react";
import { getMensaje } from '../../api/mascota.api'

export function obtenerMensaje(mascota){
    const [mensaje, setMensaje] = useState(" ");

    useEffect(() => {
        cargarMensaje();
    }, []);

    const cargarMensaje = async() => {
        const msj = await getMensaje();
        const estado = await getEstado(mascota.id)
        if(estado == "Muy bajo"){
            setMensaje(msj[4]);   
        }else if(estado == "Bajo"){
            setMensaje(msj[1]);
        }else if(estado == "Medio"){
            setMensaje(msj[2]);
        }else if(estado == "Alto"){
            setMensaje(msj[3]);
        }else if(estado == "Muy Alto"){
            setMensaje(msj[5]);
        }else{
            setMensaje(msj[2]);
        }
    }

    return(
        <div className="textoMensaje">{mensaje}</div>
    );

}