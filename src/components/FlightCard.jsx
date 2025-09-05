import React from 'react';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FlightCard = ({ flight }) => {
  const { currentUser } = useAuth();
  const journeyDate = new Date(flight.journeyDateTime).toLocaleDateString();
  const journeyTime = new Date(flight.journeyDateTime).toLocaleTimeString();

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row>
          <Col md={8}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5>{flight.flightName}</h5>
                <p className="text-muted mb-1">Flight Number: {flight.flightNumber}</p>
              </div>
              <Badge bg="info" className="ms-2">
                Available
              </Badge>
            </div>
            
            <Row className="mt-3">
              <Col>
                <h6>{flight.from}</h6>
                <p className="text-muted mb-0">Departure: {journeyTime}</p>
              </Col>
              <Col className="text-center">
                <div>→</div>
                <small className="text-muted">{journeyDate}</small>
              </Col>
              <Col>
                <h6 className="text-end">{flight.to}</h6>
                <p className="text-muted text-end mb-0">Arrival: {new Date(
                  new Date(flight.journeyDateTime).getTime() + 2 * 60 * 60 * 1000
                ).toLocaleTimeString()}</p>
              </Col>
            </Row>
          </Col>
          
          <Col md={4} className="d-flex flex-column justify-content-between">
            <div className="text-end mb-2">
              <h5>$299</h5>
              <small className="text-muted">Economy</small>
            </div>
            
            {currentUser && currentUser.role === 'passenger' && (
              <Button 
                as={Link} 
                to={`/book-flight/${flight._id}`}
                variant="primary"
                className="w-100"
              >
                Book Now
              </Button>
            )}
            
            {currentUser && currentUser.role === 'admin' && (
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm">
                  Edit Flight
                </Button>
                <Button variant="outline-danger" size="sm">
                  Delete Flight
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FlightCard;