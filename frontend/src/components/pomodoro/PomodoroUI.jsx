import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaSyncAlt } from 'react-icons/fa';
import { Button, Card, Form, Row, Col, InputGroup } from 'react-bootstrap'; 
import './estilos/Pomodoro.css';

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
    const numValue = value === '' ? '' : Math.max(0, parseInt(value, 10)); //Guarda en base 10
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: numValue
    }));
  };

  const handleSave = () => {
    const payload = {
      focus_time: settings.work,
      break_time: settings.break,
      // Si necesitaras enviar el long_break_time, lo añadirías aquí
    };
    onSave(payload); 
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    // Ponemos formato con 0 a la izquierda, ej: 01:09.
  };

  return (
    <Card className="text-center shadow-lg pomodoro-container" style={{ maxWidth: '500px', margin: 'auto' }}>
      <Card.Body>
        <Form>
          <Row className="align-items-center mb-4">
            <Col>
              <InputGroup>
                <InputGroup.Text>Focus</InputGroup.Text>
                <Form.Control 
                  type="number"
                  name="work"
                  value={settings.work === 0 ? '' : settings.work}
                  onChange={handleInputChange}
                  disabled={isActive}
                  aria-label="Tiempo de trabajo en minutos"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Text>Descanso</InputGroup.Text>
                <Form.Control 
                  type="number"
                  name="break"
                  value={settings.break === 0 ? '' : settings.break}
                  onChange={handleInputChange}
                  disabled={isActive}
                  aria-label="Tiempo de descanso en minutos"
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
                <Button variant="outline-light" onClick={handleSave} disabled={isActive}>
                  Guardar
                </Button>
            </Col>
          </Row>
        </Form>
        
        <Card.Title as="h2" className="mb-3">
          {sessionType === 'work' ? 'Focus' : 'Descanso'}
        </Card.Title>
        
        {/* Usamos una clase para el display del timer */}
        <Card.Text className="display-timer">
          {formatTime(timeLeft)}
        </Card.Text>
        
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-3">
          <Button variant="outline-success" size="lg" onClick={onStartPause} className="px-4 gap-3">
            {isActive ? <FaPause /> : <FaPlay />}
          </Button>
          <Button variant="outline-secondary" size="lg" onClick={onReset} className="px-4">
            <FaSyncAlt />
          </Button>
        </div>

      </Card.Body>
    </Card>
  );
};  

export default PomodoroUI;