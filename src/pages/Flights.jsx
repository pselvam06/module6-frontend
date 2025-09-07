import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    date: ''
  });
  
  const { API_BASE_URL } = useAuth();
=======
import API from '../api/axiosClient';
import { Link } from 'react-router-dom';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({ from:'', to:'', journeyDate:'' });
>>>>>>> 82e1e21 (first commit)

  useEffect(() => {
    fetchFlights();
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    filterFlights();
  }, [flights, filters]);

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

  const filterFlights = () => {
    let result = flights;

    if (filters.from) {
      result = result.filter(flight => 
        flight.from.toLowerCase().includes(filters.from.toLowerCase())
      );
    }

    if (filters.to) {
      result = result.filter(flight => 
        flight.to.toLowerCase().includes(filters.to.toLowerCase())
      );
    }

    if (filters.date) {
      const filterDate = new Date(filters.date);
      result = result.filter(flight => {
        const flightDate = new Date(flight.journeyDateTime);
        return flightDate.toDateString() === filterDate.toDateString();
      });
    }

    setFilteredFlights(result);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
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
          <h2 className="mb-4">Available Flights</h2>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>From</Form.Label>
            <Form.Control
              type="text"
              name="from"
              value={filters.from}
              onChange={handleFilterChange}
              placeholder="Departure city"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>To</Form.Label>
            <Form.Control
              type="text"
              name="to"
              value={filters.to}
              onChange={handleFilterChange}
              placeholder="Destination city"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {filteredFlights.length === 0 ? (
        <Alert variant="info">
          {flights.length === 0 ? 'No flights available' : 'No flights match your filters'}
        </Alert>
      ) : (
        <Row>
          {filteredFlights.map(flight => (
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
                  <Link to={`/book/${flight._id}`}>
                    <Button variant="primary">Book Now</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Flights;
=======
  const fetchFlights = async () => {
    const params = {};
    if (filters.from) params.from = filters.from;
    if (filters.to) params.to = filters.to;
    if (filters.journeyDate) params.journeyDate = filters.journeyDate;
    const res = await API.get('/flights', { params });
    setFlights(res.data);
  };

  return (
    <div>
      <h2>Available Flights</h2>
      <div>
        <input placeholder="From" value={filters.from} onChange={e => setFilters(s => ({...s, from: e.target.value}))} />
        <input placeholder="To" value={filters.to} onChange={e => setFilters(s => ({...s, to: e.target.value}))} />
        <input type="date" value={filters.journeyDate} onChange={e => setFilters(s => ({...s, journeyDate: e.target.value}))} />
        <button onClick={fetchFlights}>Search</button>
      </div>
      <ul>
        {flights.map(f => (
          <li key={f._id}>
            <div>{f.flightNumber} - {f.flightName}</div>
            <div>{f.from} → {f.to} at {new Date(f.journeyDateTime).toLocaleString()}</div>
            <Link to={`/book/${f._id}`}>Book</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
>>>>>>> 82e1e21 (first commit)
