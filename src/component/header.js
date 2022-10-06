import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import icon from './resource/icon.png';
import  './header.css';

const Header = () => {
  return (
    <header>
      <Navbar className = "navcolor" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={icon}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            Image Fake
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <hr></hr>
    </header>
  );
}

export default Header;