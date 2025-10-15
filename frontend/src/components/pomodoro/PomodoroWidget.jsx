import React, { useState, useEffect, useCallback } from 'react';
import PomodoroUI from './PomodoroUI.jsx';
import { getPomodoroSettings, updatePomodoroSettings, logPomodoroSession } from '../../api/pomodoro.api.js';

const alertSound = new Audio('/alerta.mp3'); 

const PomodoroWidget = () => {

  const [settings, setSettings] = useState({
    focus_time: 25,
    break_time: 5,
    long_break_time: 15,
    sessions_completed: 0,
    sessions_until_long_break: 4,
  });
  const [timeLeft, setTimeLeft] = useState(settings.focus_time * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('work'); // 'work', 'break', o 'long_break'
  const [sessionStartTime, setSessionStartTime] = useState(null);

  const loadSettings = useCallback(async () => {
    try {
      const response = await getPomodoroSettings();
      setSettings(response.data);
      if (!isActive) {
        setTimeLeft(response.data.focus_time * 60); // Inicia con el tiempo de Focus.
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
      session_type: sessionType === 'work' ? 'focus' : (sessionType === 'break' ? 'short_break' : 'long_break'),
      start_time: sessionStartTime,
      end_time: new Date().toISOString(), //Reinicia el tiempo de inicio para la nueva sesión
      was_successful: true
    });

    alertSound.play(); //Suena para alertar del cambio de tipo de sesión

    const updatedSettings = await getPomodoroSettings().then(res => res.data);
    
    if (sessionType === 'work') {
      if (updatedSettings.sessions_completed === 0) {
        setSessionType('long_break');
        setTimeLeft(updatedSettings.long_break_time * 60);
      } else {
        setSessionType('break');
        setTimeLeft(updatedSettings.break_time * 60);
      }
    } else {
      setSessionType('work');
      setTimeLeft(updatedSettings.focus_time * 60);
    }
    setSettings(updatedSettings);

  }, [sessionType, sessionStartTime]);


  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000); //Actualiza el temporizador cada 1000 mseg, es decir, 1 seg.
    } else if (timeLeft === 0 && isActive) {
      handleSessionEnd();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, handleSessionEnd]);

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
      workDuration={settings.focus_time}
      breakDuration={settings.break_time}
      longBreakDuration={settings.long_break_time} 
      onSave={handleSettingsSave} 
    />
    </div>
  );
};

export default PomodoroWidget;