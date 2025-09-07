<<<<<<< HEAD
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
=======
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <NavLink className="navbar-brand" to="/">FlightApp</NavLink>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
            </>
          )}

          {user && user.role === "passenger" && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/flights">Flights</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/bookings">My Bookings</NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
              </li>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/manage">Manage Bookings</NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
>>>>>>> 82e1e21 (first commit)
