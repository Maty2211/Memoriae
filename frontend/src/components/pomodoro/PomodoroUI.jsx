import React, { useState, useEffect } from 'react';

const PomodoroUI = ({ 
    timeLeft, 
    isActive, 
    sessionType, 
    onStartPause, 
    onReset,
    workDuration,
    breakDuration,
    onSave
}) => {
  

  const [settings, setSettings] = useState({
    work: workDuration,
    break: breakDuration
  });

  //Sincroniza si las props cambian
  useEffect(() => {
    setSettings({ work: workDuration, break: breakDuration });
  }, [workDuration, breakDuration]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({
        ...prevSettings,
        [name]: parseInt(value, 10) //Guarda en base 10
    }));
  };

  const handleSave = () => {
    onSave(settings);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    // Ponemos formato con 0 a la izquierda, ej: 01:09.
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      
      <div className="settings" style={{ textAlign: 'left', marginBottom: '10px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
        <div>
          <label>Focus (min): </label>
          <input 
            type="number" 
            name="work"
            value={settings.work}
            onChange={handleInputChange}
            disabled={isActive}
            style={{width: '50px'}}
          />
        </div>
        <div>
          <label>Descanso (min): </label>
          <input 
            type="number" 
            name="break"
            value={settings.break}
            onChange={handleInputChange}
            disabled={isActive}
            style={{width: '50px'}}
          />
        </div>
        <button onClick={handleSave} disabled={isActive}>
          Guardar
        </button>
      </div>

      <h2>{sessionType === 'work' ? 'Focus' : 'Descanso'}</h2>
      <div style={{ fontSize: '4rem', margin: '20px 0' }}>
        {formatTime(timeLeft)}
      </div>
      <div>
        <button onClick={onStartPause} style={{ marginRight: '10px' }}>
          {isActive ? 'Pausa' : 'Iniciar'}
        </button>
        <button onClick={onReset}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default PomodoroUI;