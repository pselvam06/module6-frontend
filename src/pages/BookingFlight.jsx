import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BookFlight = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { currentUser, API_BASE_URL } = useAuth();
  
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    contactNumber: '',
    totalPassengers: 1,
    assistanceRequired: false,
    passengers: [{ name: '', age: '' }]
  });

  useEffect(() => {
    fetchFlight();
  }, [flightId]);

  const fetchFlight = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/flights/${flightId}`);
      setFlight(response.data);
    } catch (error) {
      setError('Failed to fetch flight details');
      console.error('Error fetching flight:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePassengerChange = (index, e) => {
    const { name, value } = e.target;
    const passengers = [...formData.passengers];
    passengers[index][name] = value;
    
    setFormData(prev => ({
      ...prev,
      passengers
    }));
  };

  const addPassenger = () => {
    if (formData.passengers.length < formData.totalPassengers) {
      setFormData(prev => ({
        ...prev,
        passengers: [...prev.passengers, { name: '', age: '' }]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.passengers.some(p => !p.name || !p.age)) {
      setError('Please fill in all passenger details');
      return;
    }
    
    try {
      setSubmitting(true);
      setError('');
      
      const bookingData = {
        flightId,
        contactNumber: formData.contactNumber,
        totalPassengers: parseInt(formData.totalPassengers),
        assistanceRequired: formData.assistanceRequired,
        passengers: formData.passengers
      };
      
      const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
      
      setSuccess('Booking successful! Redirecting to your bookings...');
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Booking failed');
      console.error('Error creating booking:', error);
    } finally {
      setSubmitting(false);
    }
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

  if (!flight) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Flight not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Book Flight</h2>
              
              <Card className="mb-4">
                <Card.Body>
                  <h5>Flight Details</h5>
                  <p>
                    <strong>{flight.flightName}</strong> ({flight.flightNumber})<br />
                    From: {flight.from} | To: {flight.to}<br />
                    Departure: {new Date(flight.journeyDateTime).toLocaleString()}<br />
                    Available Seats: {flight.seatsAvailable} | Price: ${flight.price} per passenger
                  </p>
                </Card.Body>
              </Card>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    placeholder="Your contact number"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Number of Passengers</Form.Label>
                  <Form.Select
                    name="totalPassengers"
                    value={formData.totalPassengers}
                    onChange={handleChange}
                  >
                    {[...Array(Math.min(flight.seatsAvailable, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Maximum {flight.seatsAvailable} seats available
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="assistanceRequired"
                    label="Require special assistance"
                    checked={formData.assistanceRequired}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <div className="mb-3">
                  <h5>Passenger Details</h5>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={addPassenger}
                    disabled={formData.passengers.length >= formData.totalPassengers}
                    className="mb-3"
                  >
                    Add Passenger
                  </Button>
                  
                  {formData.passengers.map((passenger, index) => (
                    <Card key={index} className="mb-2">
                      <Card.Body>
                        <h6>Passenger {index + 1}</h6>
                        <Row>
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                value={passenger.name}
                                onChange={(e) => handlePassengerChange(index, e)}
                                required
                                placeholder="Passenger name"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Age</Form.Label>
                              <Form.Control
                                type="number"
                                name="age"
                                value={passenger.age}
                                onChange={(e) => handlePassengerChange(index, e)}
                                required
                                min="1"
                                max="120"
                                placeholder="Age"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center">
                  <h4>Total Amount: ${flight.price * formData.totalPassengers}</h4>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookFlight;