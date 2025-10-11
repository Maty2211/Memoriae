import React, { useState, useEffect } from 'react';
import PomodoroUI from './PomodoroUI';

const alertSound = new Audio('/alerta.mp3'); 

const PomodoroWidget = () => {

  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('work');

  useEffect(() => {
    let interval = null;

    if (isActive && (timeLeft > 0)) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000); //Actualiza el temporizador cada 1000 mseg, es decir, 1 seg.
    } else if (timeLeft === 0) {
      const nextSession = sessionType === 'work' ? 'break' : 'work';
      const nextDuration = nextSession === 'work' ? workDuration : breakDuration;
      
      setSessionType(nextSession);
      setTimeLeft(nextDuration);
      setIsActive(true);
      alertSound.play(); //Suena para alertar del cambio de tipo de sesión
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, sessionType, workDuration, breakDuration]);

  const handleSettingsSave = (newSettings) => {
    if (isActive) return;

    let newWorkSeconds = workDuration;
    let newBreakSeconds = breakDuration;

    if (newSettings.work && newSettings.work > 0) {
      newWorkSeconds = newSettings.work * 60;
    }

    if (newSettings.break && newSettings.break > 0) {
      newBreakSeconds = newSettings.break * 60;
    }

    setWorkDuration(newWorkSeconds);
    setBreakDuration(newBreakSeconds);

    if (sessionType === 'work') {
      setTimeLeft(newWorkSeconds);
    } else {
      setTimeLeft(newBreakSeconds);
    }
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSessionType('work');
    setTimeLeft(workDuration);
  };

  const handleDurationChange = (type, value) => {
    const newDurationInSeconds = value * 60;

    if (type === 'work') {
        setWorkDuration(newDurationInSeconds);
        if (sessionType === 'work' && !isActive) {
            setTimeLeft(newDurationInSeconds);
        }
    } else if (type === 'break') {
        setBreakDuration(newDurationInSeconds);
        if (sessionType === 'break' && !isActive) {
          setTimeLeft(newDurationInSeconds);
        };
    };
  };

  return (
    <div>
    <PomodoroUI
      timeLeft={timeLeft}
      isActive={isActive}
      sessionType={sessionType}
      onStartPause={handleStartPause}
      onReset={handleReset}
      workDuration={workDuration / 60}
      breakDuration={breakDuration / 60}
      onSave={handleSettingsSave} 
    />
    </div>
  );
};

export default PomodoroWidget;