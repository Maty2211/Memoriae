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
  const [sessionType, setSessionType] = useState('work');
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const intervalRef = useRef(null);

  const loadSettings = useCallback(async () => {
    try {
      await getCsrfToken(); 
      const response = await getPomodoroSettings();
      setSettings(response.data);
      setTimeLeft(response.data.work_time * 60); // Inicia con el tiempo de Focus.
      setSessionType('work');
    } catch (error) {
      console.error("No se pudieron cargar las configuraciones.", error);
    }
  }, []);


  useEffect(() => {
    loadSettings();
  }, [loadSettings]);


  const handleSessionEnd = useCallback(async () => {
    if (!sessionStartTime) return;

    //Loguea la sesión que acaba de terminar
    await logPomodoroSession({
      session_type: sessionType === 'work' ? 'work' : 
                    sessionType === 'break' ? 'short_break' : 'long_break',
      start_time: sessionStartTime,
      end_time: new Date().toISOString(), //Reinicia el tiempo de inicio para la nueva sesión
      was_successful: true
    });

    try {
      await alertSound.play();
    } catch (e) {
      console.error("No se pudo reproducir el sonido.", e);
    }
    
    const updatedSettings = await getPomodoroSettings();    
    //Si el back reseteó sessions_completed, toca long break
    if (sessionType === 'work') {
      if (updatedSettings.sessions_completed === 0 && settings.sessions_completed > 0) {
        nextSessionType = 'long_break';
        nextTimeLeft = updatedSettings.long_break_time * 60;
      } else {
        nextSessionType = 'break';
        nextTimeLeft = updatedSettings.break_time * 60;
      }
    }
    
    setSettings(updatedSettings);
    setSessionType(nextSessionType);
    setTimeLeft(nextTimeLeft);
    setSessionStartTime(new Date().toISOString());
    setIsActive(true);

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
  }, [isActive, timeLeft, handleSessionEnd]);

  const handleSettingsSave = async (newSettings) => {
    if (isActive) return;
    try {   
      await updatePomodoroSettings(newSettings);
      await loadSettings();
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
    }
  };

  const handleStartPause = () => {
    if (!isActive && sessionStartTime === null) {
      setSessionStartTime(new Date().toISOString());
    }
    setIsActive(prev => !prev);
  };

  const handleReset = () => {
    setIsActive(false);   
    clearInterval(intervalRef.current);
    loadSettings();
    setSessionStartTime(null);
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