import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import './styleNavbar.css'

function MemoriaeNavbar() {
  const [show, setShow] = useState(false); // estado para controlar el Offcanvas

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show); // toggle

  return (
    <>
      <Navbar bg="light" fixed="top" expand={false} className="custom-navbar shadow-sm p-2">
        <Container fluid>
          {/* Botón hamburguesa */}
          <Navbar.Toggle 
            aria-controls="offcanvasNavbar" 
            onClick={handleShow} 
            className="me-2"
          />

          {/* Logo y links */}
          <Navbar.Brand as={Link} to="/" className="fw-bold">MEMORIAE</Navbar.Brand>
          <Navbar.Brand as={Link} to="/mascota" className="fw-bold ms-2">Mascota</Navbar.Brand>
          <Navbar.Brand as={Link} to="/perfil" className="fw-bold ms-2">Perfil</Navbar.Brand>

          {/* Menú lateral */}
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="custom-offcanvas"
            show={show}        // <- control manual con estado
            onHide={handleClose} // <- para cerrar con toggle
            backdrop={false}   // sigue sin gris
          >
            <Offcanvas.Body>
              <Nav className="flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/pomodoro">Pomodoro</Nav.Link>
                <Nav.Link as={Link} to="/Flashcard">Flashcard</Nav.Link>
                <Nav.Link as={Link} to="/toDoList">To do list</Nav.Link>
                <Nav.Link as={Link} to="/calendar1">Calendario</Nav.Link>
                <Nav.Link as={Link} to="/evento">Eventos</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default MemoriaeNavbar;
