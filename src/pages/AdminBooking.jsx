import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
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

  const updateBookingStatus = async (bookingId, status) => {
    try {
      setUpdating(true);
      setMessage('');
      setError('');
      
      await axios.put(`${API_BASE_URL}/bookings/${bookingId}/status`, { status });
      
      setMessage('Booking status updated successfully');
      fetchBookings(); // Refresh the list
    } catch (error) {
      setError('Failed to update booking status');
      console.error('Error updating booking:', error);
    } finally {
      setUpdating(false);
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
          <h2 className="mb-4">Manage Bookings</h2>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      {bookings.length === 0 ? (
        <Alert variant="info">No bookings found.</Alert>
      ) : (
        <Row>
          {bookings.map(booking => (
            <Col md={6} lg={4} key={booking._id} className="mb-4">
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
                    <strong>Passenger:</strong> {booking.passenger.name}<br />
                    <strong>Email:</strong> {booking.passenger.email}<br />
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
                    <span className="h6 mb-0">Total: ${booking.totalAmount}</span>
                    <small className="text-muted">
                      Booked on: {formatDateTime(booking.createdAt)}
                    </small>
                  </div>
                  
                  {booking.status === 'Pending' && (
                    <div className="mt-3">
                      <h6>Update Status:</h6>
                      <ButtonGroup size="sm">
                        <Button
                          variant="success"
                          onClick={() => updateBookingStatus(booking._id, 'Approved')}
                          disabled={updating}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => updateBookingStatus(booking._id, 'Rejected')}
                          disabled={updating}
                        >
                          Reject
                        </Button>
                      </ButtonGroup>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AdminBookings;