import React, { useState, useEffect, useCallback, useRef } from 'react';
import PomodoroUI from './PomodoroUI.jsx';
import { getPomodoroSettings, updatePomodoroSettings, logPomodoroSession, getCsrfToken } from '../../api/pomodoro.api.js';

const alertSound = new Audio('/alerta.mp3'); 

const PomodoroWidget = () => {

  const [settings, setSettings] = useState({
    work_time: 25,
    break_time: 5,
    long_break_time: 15,
    sessions_completed: 0,
    sessions_until_long_break: 4,
  });
  const [timeLeft, setTimeLeft] = useState(settings.work_time * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('work'); // 'work', 'break', o 'long_break'
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const intervalRef = useRef(null);

  const loadSettings = useCallback(async () => {
    try {
      await getCsrfToken(); 
      const response = await getPomodoroSettings();
      setSettings(response.data);
      if (!isActive) {
        setTimeLeft(response.data.work_time * 60); // Inicia con el tiempo de Focus.
        setSessionType('work');
      }
    } catch (error) {
      console.error("No se pudieron cargar las configuraciones.", error);
    }
  }, [isActive]);


  useEffect(() => {
    loadSettings();
  }, [loadSettings]);


  const handleSessionEnd = useCallback(async () => {

    setIsActive(false);
    //Loguea la sesión que acaba de terminar
    await logPomodoroSession({
      session_type: sessionType === 'work' ? 'work' : 
                    sessionType === 'break' ? 'short_break' : 'long_break',
      start_time: sessionStartTime,
      end_time: new Date().toISOString(), //Reinicia el tiempo de inicio para la nueva sesión
      was_successful: true
    });


    alertSound.play();
    
    const updatedSettings = await getPomodoroSettings().then(res => res.data);
    
    //Si el back reseteó sessions_completed, toca long break
    if (sessionType === 'work') {
      if (updatedSettings.sessions_completed === 0 && settings.sessions_completed > 0) {
        setSessionType('long_break');
        setTimeLeft(updatedSettings.long_break_time * 60);
      } else {
        setSessionType('break');
        setTimeLeft(updatedSettings.break_time * 60);
      }
    } else {
      setSessionType('work');
      setTimeLeft(updatedSettings.work_time * 60);
    }
    setSettings(updatedSettings);

  }, [sessionType, sessionStartTime, settings]);


  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            handleSessionEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); //Actualiza el temporizador cada 1000 mseg, es decir, 1 seg.
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, handleSessionEnd]);

  const handleSettingsSave = async (newSettings) => {
    if (isActive) return;
    try {   
      await updatePomodoroSettings(newSettings);
      alert("Configuración guardada");
      await loadSettings();
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
      alert("No se pudo guardar la configuración");
    }
  };

  const handleStartPause = () => {
    if (!isActive) {
      setSessionStartTime(new Date().toISOString());
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);   
    clearInterval(intervalRef.current);
    loadSettings();
  };

  return (
    <div>
    <PomodoroUI
      timeLeft={timeLeft}
      isActive={isActive}
      sessionType={sessionType}
      onStartPause={handleStartPause}
      onReset={handleReset}
      workDuration={settings.work_time}
      breakDuration={settings.break_time}
      longBreakDuration={settings.long_break_time} 
      onSave={handleSettingsSave}
      sessionsCompleted={settings.sessions_completed}
      sessionsUntilLongBreak={settings.sessions_until_long_break}
    />
    </div>
  );
};

export default PomodoroWidget;