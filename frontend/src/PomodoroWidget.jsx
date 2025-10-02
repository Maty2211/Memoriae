import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios'; 
import { FaPlay, FaPause, FaStop } from 'react-icons/fa'; // Iconos

// --- Constantes del Pomodoro ---
const SESSION_TYPES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break'
};

const PomodoroWidget = ({ userToken }) => {
  // --- Estados del Temporizador ---
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0); // Tiempo restante en segundos
  const [sessionType, setSessionType] = useState(SESSION_TYPES.FOCUS);
  
  // --- Estados de Configuración (Desde Django API) ---
  const [settings, setSettings] = useState({
    working_time: 25, 
    break_time: 5,
    long_break_time: 15,
    sessions_completed: 0,
    sessions_until_long_break: 4
  });
  
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const BASE_URL = '/pomodoro'; 

// ----------------------------------------------------------------------
// LÓGICA DE LA API (GET/POST)
// ----------------------------------------------------------------------

  const fetchSettings = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/settings/`, {
        headers: { Authorization: `Token ${userToken}` } 
      });
      
      const data = response.data;
      setSettings(data);
      if (!isActive) {
        setTime(data.working_time * 60);
      }

    } catch (error) {
      console.error("Error al cargar la configuración de Pomodoro:", error);
      if (!isActive) {
         setTime(settings.working_time * 60); 
      }
    }
  }, [userToken, isActive, settings.working_time]); 

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]); 

  // Registra la sesión completada o INCOMPLETA en el backend
  const registerSession = useCallback(async (currentSession, wasSuccessful) => {
    const endTime = new Date();
    
    if (!startTimeRef.current) {
        console.warn("No se pudo registrar la sesión: falta startTime.");
        return;
    }

    const durationSeconds = (endTime.getTime() - startTimeRef.current.getTime()) / 1000;
    
    try {
        await axios.post(`${BASE_URL}/sessions/complete/`, 
            {
                session_type: currentSession,
                start_time: startTimeRef.current.toISOString(), 
                end_time: endTime.toISOString(),
                was_successful: wasSuccessful, // Indica si fue completada o abortada (RF07)
                duration_minutes: Math.floor(durationSeconds / 60) // Duración real en minutos
            },
            {
                headers: { Authorization: `Token ${userToken}` }
            }
        );
        fetchSettings(); 

    } catch (error) {
        console.error("Error al registrar la sesión en el backend:", error);
    }
  }, [userToken, fetchSettings]);

// ----------------------------------------------------------------------
// LÓGICA DE CONTROL DEL TEMPORIZADOR
// ----------------------------------------------------------------------

  const handleStart = () => {
    if (!isActive) {
        if (time === 0) {
            setTime(settings.working_time * 60);
            setSessionType(SESSION_TYPES.FOCUS);
        }
        startTimeRef.current = new Date(); 
    }
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };
  
  const handleCancel = async () => {
    if (isActive) {
        clearInterval(intervalRef.current);
        setIsActive(false);
        setIsPaused(false);

        // 1. Registrar la sesión INCOMPLETA (RF07)
        await registerSession(sessionType, false); 
        
        // 2. Reiniciar estados para un nuevo ciclo
        setSessionType(SESSION_TYPES.FOCUS);
        setTime(settings.working_time * 60); 
        startTimeRef.current = null;
        
        console.log("Sesión cancelada. Se calcularán recompensas proporcionales.");
    }
  };

  const handleSessionCycle = useCallback(async (currentSession) => {
    await registerSession(currentSession, true); // wasSuccessful = true

    let nextSession = SESSION_TYPES.FOCUS;
    let nextTime = settings.working_time * 60;
    
    // settings.sessions_completed ya fue actualizada por fetchSettings en registerSession
    const currentCompleted = settings.sessions_completed; 
    
    if (currentSession === SESSION_TYPES.FOCUS) {
        // Usamos el contador actualizado por el backend
        if (currentCompleted % settings.sessions_until_long_break === 0) {
            nextSession = SESSION_TYPES.LONG_BREAK;
            nextTime = settings.long_break_time * 60;
        } else {
            nextSession = SESSION_TYPES.SHORT_BREAK;
            nextTime = settings.break_time * 60;
        }
    } else {
        nextSession = SESSION_TYPES.FOCUS;
        nextTime = settings.working_time * 60;
    }

    setSessionType(nextSession);
    setTime(nextTime);
    startTimeRef.current = new Date(); 
    setIsActive(true);
    
    console.log(`¡${currentSession} Terminado! Empezando ${nextSession}.`);
  }, [settings, registerSession]);


  // Hook para el "Tick" del Temporizador
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalRef.current);
            setIsActive(false);
            handleSessionCycle(sessionType); 
            return 0; 
          }
        });
      }, 1000);
    } else if (!isActive || isPaused) {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, sessionType, handleSessionCycle]); 

// ----------------------------------------------------------------------
// RENDERIZADO
// ----------------------------------------------------------------------

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const sessionStyle = sessionType === SESSION_TYPES.FOCUS 
    ? { backgroundColor: '#FF6347', color: 'white' }
    : { backgroundColor: '#3CB371', color: 'white' };

  const buttonBaseStyle = {
    padding: '10px 20px', margin: '0 5px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s'
  };

  return (
    <div className="pomodoro-widget" 
         style={{ 
             textAlign: 'center', 
             padding: '20px', 
             borderRadius: '12px', 
             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
             ...sessionStyle 
         }}
    >
      <h3 style={{ marginBottom: '10px' }}>{settings.title || 'Temporizador Pomodoro'}</h3>
      
      <p style={{ fontSize: '1.2em', opacity: 0.9 }}>
          Ciclo: 
          <span style={{ marginLeft: '5px' }}> 
          {sessionType === SESSION_TYPES.FOCUS ? 'Concentración' : (sessionType === SESSION_TYPES.SHORT_BREAK ? 'Descanso Corto' : 'Descanso Largo')}
          </span>
      </p>

      <h1 style={{ fontSize: '5em', margin: '10px 0' }}>{formatTime(time)}</h1>

      <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
        Pomodoros completados: {settings.sessions_completed} de {settings.sessions_until_long_break}
      </p>

      <div className="controls" style={{ marginTop: '30px' }}>
        
        {/* Botón Principal (Iniciar / Pausar / Reanudar) */}
        {!isActive || isPaused ? (
            <button 
                onClick={handleStart} 
                style={{ ...buttonBaseStyle, backgroundColor: '#1E90FF', color: 'white' }}
            >
                {isPaused ? <><FaPlay /> Reanudar</> : <><FaPlay /> Iniciar</>}
            </button>
        ) : (
             <button 
                onClick={handlePauseResume} 
                style={{ ...buttonBaseStyle, backgroundColor: '#FFD700', color: 'black' }}
            >
                <FaPause /> Pausar
            </button>
        )}
        
        {/* Botón de Cancelar Sesión (RF07) */}
        {isActive && (
            <button 
                onClick={handleCancel} 
                style={{ 
                    ...buttonBaseStyle, 
                    backgroundColor: '#DC143C', 
                    color: 'white',
                    marginLeft: '10px'
                }}
            >
                <FaStop /> Cancelar
            </button>
        )}
        
      </div>
    </div>
  );
};

export default PomodoroWidget;