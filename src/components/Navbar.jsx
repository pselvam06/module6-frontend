import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Flight Ticket System</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/flights">
              <Nav.Link>Flights</Nav.Link>
            </LinkContainer>
            
            {currentUser && currentUser.role === 'passenger' && (
              <LinkContainer to="/my-bookings">
                <Nav.Link>My Bookings</Nav.Link>
              </LinkContainer>
            )}
            
            {currentUser && currentUser.role === 'admin' && (
              <>
                <LinkContainer to="/admin/flights">
                  <Nav.Link>Manage Flights</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/bookings">
                  <Nav.Link>Manage Bookings</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <Navbar.Text className="me-3">
                  Signed in as: {currentUser.name} ({currentUser.role})
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;