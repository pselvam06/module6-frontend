import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert, Modal } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [formData, setFormData] = useState({
    flightNumber: '',
    flightName: '',
    from: '',
    to: '',
    journeyDateTime: '',
    seatsAvailable: 60,
    price: ''
  });
  const [submitting, setSubmitting] = useState(false);
  
  const { API_BASE_URL } = useAuth();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/flights`);
      setFlights(response.data);
    } catch (error) {
      setError('Failed to fetch flights');
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (flight = null) => {
    if (flight) {
      setEditingFlight(flight);
      setFormData({
        flightNumber: flight.flightNumber,
        flightName: flight.flightName,
        from: flight.from,
        to: flight.to,
        journeyDateTime: new Date(flight.journeyDateTime).toISOString().slice(0, 16),
        seatsAvailable: flight.seatsAvailable,
        price: flight.price
      });
    } else {
      setEditingFlight(null);
      setFormData({
        flightNumber: '',
        flightName: '',
        from: '',
        to: '',
        journeyDateTime: '',
        seatsAvailable: 60,
        price: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFlight(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError('');
      
      if (editingFlight) {
        await axios.put(`${API_BASE_URL}/flights/${editingFlight._id}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/flights`, formData);
      }
      
      handleCloseModal();
      fetchFlights(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save flight');
      console.error('Error saving flight:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (flightId) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        await axios.delete(`${API_BASE_URL}/flights/${flightId}`);
        fetchFlights(); // Refresh the list
      } catch (error) {
        setError('Failed to delete flight');
        console.error('Error deleting flight:', error);
      }
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
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <h2>Manage Flights</h2>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add New Flight
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {flights.length === 0 ? (
        <Alert variant="info">No flights found.</Alert>
      ) : (
        <Row>
          {flights.map(flight => (
            <Col md={6} lg={4} key={flight._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{flight.flightName} ({flight.flightNumber})</Card.Title>
                  <Card.Text>
                    <strong>From:</strong> {flight.from}<br />
                    <strong>To:</strong> {flight.to}<br />
                    <strong>Departure:</strong> {formatDateTime(flight.journeyDateTime)}<br />
                    <strong>Seats Available:</strong> {flight.seatsAvailable}<br />
                    <strong>Price:</strong> ${flight.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleShowModal(flight)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(flight._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingFlight ? 'Edit Flight' : 'Add New Flight'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Flight Number</Form.Label>
              <Form.Control
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Flight Name</Form.Label>
              <Form.Control
                type="text"
                name="flightName"
                value={formData.flightName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Departure Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="journeyDateTime"
                value={formData.journeyDateTime}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Seats Available</Form.Label>
              <Form.Control
                type="number"
                name="seatsAvailable"
                value={formData.seatsAvailable}
                onChange={handleChange}
                required
                min="1"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Flight'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminFlights;