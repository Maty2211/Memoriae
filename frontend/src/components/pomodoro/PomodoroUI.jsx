import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaSyncAlt } from 'react-icons/fa';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap'; 
import './estilos/Pomodoro.css';

const PomodoroUI = ({ 
    timeLeft, 
    isActive, 
    sessionType, 
    onStartPause, 
    onReset,
    workDuration,
    breakDuration,
    longBreakDuration,
    onSave
}) => {
  
  const [settings, setSettings] = useState({
    work: workDuration,
    break: breakDuration,
    longBreak: longBreakDuration,
  });

  //Sincroniza si las props cambian
  useEffect(() => {
    setSettings({ 
      work: workDuration, 
      break: breakDuration,
      longBreak: longBreakDuration 
    });
  }, [workDuration, breakDuration, longBreakDuration]);

  // Maneja los cambios en los inputs de tiempo.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //Guarda en base 10
    const numValue = value === '' ? '' : Math.max(0, parseInt(value, 10));
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: numValue
    }));
  };

  const handleSave = () => {
    const payload = {
      focus_time: settings.work,
      break_time: settings.break,
      long_break_time: settings.longBreak,
      // Si necesitaras enviar el long_break_time, lo añadirías aquí
    };
    onSave(payload); 
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    // Ponemos formato con 0 a la izquierda, ej: 01:09.
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pomodoro-container">
      <Row className="align-items-center h-100">

        <Col md={7} className="settings-column">
          <Form>
            <InputGroup className="mb-2">
              <InputGroup.Text>Focus</InputGroup.Text>
              <Form.Control 
                type="number" name="work"
                value={settings.work ?? ''} 
                onChange={handleInputChange} 
                disabled={isActive}
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Text>Descanso</InputGroup.Text>
              <Form.Control 
                type="number" name="break"
                value={settings.break ?? ''}
                onChange={handleInputChange} 
                disabled={isActive}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>D. Largo</InputGroup.Text>
              <Form.Control 
                type="number" name="longBreak"
                value={settings.longBreak ?? ''}
                onChange={handleInputChange} 
                disabled={isActive}
              />
            </InputGroup>
            <Button variant="secondary" onClick={handleSave} disabled={isActive} className="w-100">
              Guardar
            </Button>
          </Form>
        </Col>

        <Col md={5} className="timer-column">
          <h2 className="session-title">
            {sessionType === 'work' ? 'Focus' : 'Descanso'}
          </h2>
          {/* Usamos una clase para el display del timer */}
          <div className="display-timer">
            {formatTime(timeLeft)}
          </div>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <Button variant="success" size="lg" onClick={onStartPause}>
              {isActive ? <FaPause /> : <FaPlay />}
            </Button>
            <Button variant="secondary" size="lg" onClick={onReset}>
              <FaSyncAlt />
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};  

export default PomodoroUI;

