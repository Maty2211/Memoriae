'use client';
import './mascota.css';
import { useEffect, useState } from 'react';
import { getMascota } from '../../api/mascota.api';
import camara from './imgMascota/camara.png'
import tablero from './imgMascota/tablero.png'
import mascota from '../../assets/mascota.gif'

function Componente({ valor }) {
  let msj;
  if (valor <= 20) msj = "Tu falta de compromiso me deprime";
  else if (valor <= 40) msj = "Hora de estudiar";
  else if (valor <= 60) msj = "¡Sigue asi!";
  else if (valor <= 80) msj = "¡Te estas superando a ti mismo!";
  else msj = "¡Eres sorprendente!";

  return <p>{msj}</p>;
}

export default function MascotaPerfil() {
  const [mascotaData, setMascotaData] = useState(null);

  useEffect(() => {
    const fetchMascota = async () => {
      const mascotaO = await getMascota();
      setMascotaData({
        nombre: mascotaO.nombre,
        monedas: mascotaO.monedas,
        estado: mascotaO.estado,
        mascota: mascota,
        camara: camara,
        inventario: [
          { id: 1, nombre: 'Tablero', img: tablero },
          ...Array(14).fill(null),
        ],
      });
    };
    fetchMascota();
  }, []);

  if (!mascotaData) return <p>Cargando...</p>;

  const slotsDelInventario = Array.from({ length: 15 });

  return (
    <div className="container-general">
      <div className="mascota-container">
        <div className="mascota-title-bar">
          <span className="pet-name">{mascotaData.nombre}</span>
          <div className="coin-display">
            <span className="coin-icon"></span>
            <span className="coin-amount">{mascotaData.monedas}</span>
          </div>
          <button className="close-button">X</button>
        </div>

        <div className="mascota-main-content">
          <div className="pet-area">
            <img className="camara" src={mascotaData.camara} alt="Cámara" />
            <img className="mascota-fisica" src={mascotaData.mascota} alt="Perrito animado" />
            <div className="speech-bubble">
              <Componente valor={mascotaData.estado} />
            </div>

            <div className="status-bar-container">
              <div className="heart-icon"></div>
              <div className="status-bar">
                <div className="status-bar-fill" style={{ width: `${mascotaData.estado}%` }}></div>
              </div>
            </div>
          </div>

          <div className="inventory-grid">
            {slotsDelInventario.map((_, index) => {
              const item = mascotaData.inventario[index];
              return (
                <div key={index} className="inventory-slot">
                  {item ? (
                    <img className="tablero" src={item.img} alt="Tablero" />
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
}
