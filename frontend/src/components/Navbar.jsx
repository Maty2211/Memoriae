import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './styleNavbar.css'

function MemoriaeNavbar() {
  return (
    <Navbar bg="light" fixed="top" expand="lg" className="custom-navbar shadow-sm p-2">
      <Container fluid className="d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold memoriae-logo">
          MEMORIAE
        </Navbar.Brand>

        {/* Toggle (hamburguesa responsive) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links colapsables */}
        <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse">
          <Nav className="ms-auto custom-nav">
            <Nav.Link as={Link} to="/mascota" className="fw-bold">Mascota</Nav.Link>
            <Nav.Link as={Link} to="/perfil" className="fw-bold">Perfil</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MemoriaeNavbar;
