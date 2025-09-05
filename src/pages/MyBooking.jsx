import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { API_BASE_URL } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/bookings`);
      setBookings(response.data);
    } catch (error) {
      setError('Failed to fetch bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'danger';
      default: return 'warning';
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">My Bookings</h2>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {bookings.length === 0 ? (
        <Alert variant="info">You don't have any bookings yet.</Alert>
      ) : (
        <Row>
          {bookings.map(booking => (
            <Col md={6} key={booking._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>
                    {booking.flight.flightName} ({booking.flight.flightNumber})
                    <Badge 
                      bg={getStatusVariant(booking.status)} 
                      className="ms-2"
                    >
                      {booking.status}
                    </Badge>
                  </Card.Title>
                  <Card.Text>
                    <strong>From:</strong> {booking.flight.from}<br />
                    <strong>To:</strong> {booking.flight.to}<br />
                    <strong>Departure:</strong> {formatDateTime(booking.flight.journeyDateTime)}<br />
                    <strong>Passengers:</strong> {booking.totalPassengers}<br />
                    <strong>Contact:</strong> {booking.contactNumber}<br />
                    {booking.assistanceRequired && (
                      <span className="text-info">Special assistance requested</span>
                    )}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0">Total: ${booking.totalAmount}</span>
                    <small className="text-muted">
                      Booked on: {formatDateTime(booking.createdAt)}
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyBookings;