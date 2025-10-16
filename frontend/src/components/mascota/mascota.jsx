import { useState } from "react";
import React from 'react';
import './mascota.css';
import '../../api/mascota.api';



function Componente({ valor }) {
  let msj;

  if (valor <=20) {
    msj = "Tu falta de compromiso me deprime";
  } else if(valor <=40) {
    msj = "Hora de estudiar";
  } else if(valor <=60) {
    msj = "¡Sigue asi!";
  } else if(valor <=80) {
    msj = "¡Te estas superando a ti mismo!";
  } else if(valor > 80) {
    msj = "¡Eres sorprendente!";
  }

  return <p>{msj}</p>;
}


const MascotaPerfil = async () => {
  const slotsDelInventario = Array.from({ length: 15 });
  const mascota = await getMascota();
  const mascotaData = {
  nombre: mascota.nombre,
  monedas: mascota.monedas,
  estado: estadoMascota.estado,
  mensaje: Componente(estado),
  spriteUrl: 'https://i.imgur.com/JzaL4d1.png', // URL de un sprite de perrito pixel art
  decorUrl: 'https://i.imgur.com/SyJ2P33.png', // URL de la estantería y planta
  inventario: [
    { id: 1, nombre: 'Monitor', imgUrl: 'https://i.imgur.com/c5b2S4N.png' },
    null, null, null, null,
    null, null, null, null, null,
    null, null, null, null, null,
  ],
};

  return (
    <div className="container-general">
      <div className="mascota-container">
        {/* Barra de Título */}
        <div className="mascota-title-bar">
          <span className="pet-name">{mascotaData.nombre}</span>
          <div className="coin-display">
            <span className="coin-icon"></span>
            <span className="coin-amount">{mascotaData.monedas}</span>
          </div>
          <button className="close-button">X</button>
        </div>

        {/* Contenido Principal */}
        <div className="mascota-main-content">
          {/* Área de la Mascota (Izquierda) */}
          <div className="pet-area">
            <img src={mascotaData.decorUrl} alt="Decoración" className="pet-background-decor" />
            <img src={mascotaData.spriteUrl} alt="Mascota" className="pet-sprite" />
            <div className="speech-bubble">{mascotaData.mensaje}</div>
            
            <div className="status-bar-container">
              <div className="heart-icon"></div>
              <div className="status-bar">
                <div 
                  className="status-bar-fill" 
                  style={{ width: `${mascotaData.estado}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Inventario (Derecha) */}
          <div className="inventory-grid">
            {slotsDelInventario.map((_, index) => {
              const item = mascotaData.inventario[index];
              return (
                <div key={index} className="inventory-slot">
                  {item ? (
                    <img src={item.imgUrl} alt={item.nombre} className="inventory-item-img" />
                  ) : (
                    <span className="slot-empty"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MascotaPerfil;