import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { FaPlay, FaPause, FaStop, FaSave } from 'react-icons/fa';

import './estilos/Pomodoro.css';

const SESSION_TYPES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break'
};

const PomodoroWidget = ({ userToken }) => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [sessionType, setSessionType] = useState(SESSION_TYPES.FOCUS);
  
  // Estado que viene del backend
  const [settings, setSettings] = useState({
    focus_time: 25, 
    break_time: 5,
    long_break_time: 15,
    sessions_completed: 0,
    sessions_until_long_break: 4
  });
  
  // Estado para los inputs, permite cambios locales
  const [localSettings, setLocalSettings] = useState(settings);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const BASE_URL = 'http://localhost:8000/pomodoro'; 

  // --- LÓGICA DE DATOS ---

  const fetchSettings = useCallback(async () => {
    if (!userToken) return null;
    try {
      const response = await axios.get(`${BASE_URL}/settings/`, {
        headers: { Authorization: `Token ${userToken}` }
      });
      setSettings(response.data);
      setLocalSettings(response.data);
      return response.data; // Devuelve los datos para poder usarlos inmediatamente
    } catch (error) {
      console.error("Error al cargar la configuración de Pomodoro:", error);
      return null;
    }
  }, [userToken]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);
  
  const handleSaveChanges = async () => {
    try {
      await axios.put(`${BASE_URL}/settings/`, localSettings, {
        headers: { Authorization: `Token ${userToken}` }
      });
      setSettings(localSettings); // Sincroniza el estado principal
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
    }
  };

  const registerSession = useCallback(async (currentSession, wasSuccessful) => {
    if (!userToken || !startTimeRef.current) return;
    const endTime = new Date();
    const durationSeconds = (endTime.getTime() - startTimeRef.current.getTime()) / 1000;
    
    try {
      await axios.post(`${BASE_URL}/sessions/complete/`, {
        session_type: currentSession,
        start_time: startTimeRef.current.toISOString(), 
        end_time: endTime.toISOString(),
        was_successful: wasSuccessful,
        duration_minutes: Math.floor(durationSeconds / 60)
      }, { headers: { Authorization: `Token ${userToken}` } });
    } catch (error) {
      console.error("Error al registrar la sesión:", error);
    }
  }, [userToken]);

  // --- EFECTO PARA SINCRONIZAR EL CONTADOR ---

  useEffect(() => {
    if (!isActive) {
      const newTime = sessionType === SESSION_TYPES.FOCUS ? settings.focus_time
                    : sessionType === SESSION_TYPES.SHORT_BREAK ? settings.break_time
                    : settings.long_break_time;
      setTime(newTime * 60);
    }
  }, [settings, sessionType, isActive]);

  // --- LÓGICA DE CONTROL DEL TEMPORIZADOR ---

  const handleStart = async () => {
    if (JSON.stringify(settings) !== JSON.stringify(localSettings)) {
      await handleSaveChanges();
    }
    if (!isActive) {
      startTimeRef.current = new Date(); 
    }
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => setIsPaused(!isPaused);
  
  const handleCancel = async () => {
    if (!isActive) return;
    clearInterval(intervalRef.current);
    await registerSession(sessionType, false);
    setIsActive(false);
    setIsPaused(false);
    setSessionType(SESSION_TYPES.FOCUS);
    startTimeRef.current = null;
  };
  
  const handleSessionCycle = useCallback(async (currentSession) => {
    await registerSession(currentSession, true);
    const newSettings = await fetchSettings(); // Vuelve a pedir la config para tener el contador actualizado

    if (newSettings && currentSession === SESSION_TYPES.FOCUS) {
      // El backend ya reinició el contador si era necesario.
      // Si el contador es 0, significa que toca descanso largo.
      if (newSettings.sessions_completed === 0) {
        setSessionType(SESSION_TYPES.LONG_BREAK);
      } else {
        setSessionType(SESSION_TYPES.SHORT_BREAK);
      }
    } else {
      setSessionType(SESSION_TYPES.FOCUS);
    }
  }, [registerSession, fetchSettings]);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 1) return prevTime - 1;
          clearInterval(intervalRef.current);
          setIsActive(false);
          handleSessionCycle(sessionType);
          return 0;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, sessionType, handleSessionCycle]);

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Actualiza el estado principal 'settings' con los valores de los inputs.
      // Esto dispara el useEffect que actualiza el contador, sin llamar a la API.
      setSettings(localSettings);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const cardClasses = `pomodoro-card h-100 ${sessionType === SESSION_TYPES.FOCUS ? 'focus-session' : 'break-session'}`;

  // --- RENDERIZADO ---
  return (
    <div className={cardClasses}>
      <div className="card-body d-flex flex-column justify-content-between text-center">
        <div>
          <span className="pomodoro-badge">
            {sessionType === SESSION_TYPES.FOCUS ? 'Concentración' : (sessionType === SESSION_TYPES.SHORT_BREAK ? 'Descanso Corto' : 'Descanso Largo')}
          </span>
          <h1 className="pomodoro-timer my-3">{formatTime(time)}</h1>
          <p>
            Pomodoros completados: {settings.sessions_completed} / {settings.sessions_until_long_break}
          </p>
        </div>
        <div className="pomodoro-controls my-3">
          {!isActive || isPaused ? (
            <button onClick={handleStart} className="btn btn-light btn-lg"><FaPlay /> {isPaused ? 'Reanudar' : 'Iniciar'}</button>
          ) : (
            <button onClick={handlePauseResume} className="btn btn-light btn-lg"><FaPause /> Pausar</button>
          )}
          {isActive && (
            <button onClick={handleCancel} className="btn btn-danger btn-lg"><FaStop /> Cancelar</button>
          )}
        </div>
        <div className="pomodoro-settings">
          <div className="input-group mb-2">
            <span className="input-group-text">Focus</span>
            <input type="number" name="focus_time" value={localSettings.focus_time} onChange={handleSettingsChange} onKeyDown={handleKeyDown} className="form-control" disabled={isActive} />
          </div>
          <div className="input-group mb-2">
            <span className="input-group-text">Break</span>
            <input type="number" name="break_time" value={localSettings.break_time} onChange={handleSettingsChange} onKeyDown={handleKeyDown} className="form-control" disabled={isActive} />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Long Break</span>
            <input type="number" name="long_break_time" value={localSettings.long_break_time} onChange={handleSettingsChange} onKeyDown={handleKeyDown} className="form-control" disabled={isActive} />
          </div>
          <button onClick={handleSaveChanges} className="btn btn-outline-light w-100" disabled={isActive}><FaSave /> Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroWidget;

