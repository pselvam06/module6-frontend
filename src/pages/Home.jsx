<<<<<<< HEAD
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  const { currentUser } = useAuth();

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Welcome to Flight Ticket System</h1>
          <p className="text-center lead">
            Book your flights with ease and manage your travel plans efficiently.
          </p>
        </Col>
      </Row>
      
      <Row className="mt-5">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <Card.Title>Search Flights</Card.Title>
              <Card.Text>
                Find the perfect flight for your journey. Search by destination, date, and more.
              </Card.Text>
              <LinkContainer to="/flights">
                <Button variant="primary">Browse Flights</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <Card.Title>
                {currentUser ? 'Manage Your Bookings' : 'Create an Account'}
              </Card.Title>
              <Card.Text>
                {currentUser 
                  ? 'View and manage your existing flight bookings.'
                  : 'Sign up to start booking flights and managing your travel plans.'
                }
              </Card.Text>
              {currentUser ? (
                <LinkContainer to="/my-bookings">
                  <Button variant="primary">My Bookings</Button>
                </LinkContainer>
              ) : (
                <LinkContainer to="/register">
                  <Button variant="primary">Register Now</Button>
                </LinkContainer>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {currentUser && currentUser.role === 'admin' && (
        <Row className="mt-4">
          <Col>
            <Card className="bg-light">
              <Card.Body className="text-center">
                <Card.Title>Admin Panel</Card.Title>
                <Card.Text>
                  Access administrative functions to manage flights and bookings.
                </Card.Text>
                <LinkContainer to="/admin/flights" className="me-2">
                  <Button variant="outline-dark">Manage Flights</Button>
                </LinkContainer>
                <LinkContainer to="/admin/bookings">
                  <Button variant="outline-dark">Manage Bookings</Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
=======
import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="container mt-5">
      <h2>Welcome to FlightApp ✈️</h2>
      {user ? (
        <p>Hello {user.name}! You are logged in as <b>{user.role}</b>.</p>
      ) : (
        <p>Please login or register to continue.</p>
      )}
    </div>
  );
};

export default Home;
>>>>>>> 82e1e21 (first commit)
