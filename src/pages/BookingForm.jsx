import React, { useState, useEffect } from 'react';
import API from '../api/axiosClient';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BookingForm = () => {
  const { id: flightId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [flight, setFlight] = useState(null);
  const [form, setForm] = useState({ passengerName: '', contact:'', email:'', totalPassengers:1, assistanceRequired:false });

  useEffect(() => {
    API.get(`/flights`).then(res => {
      const found = res.data.find(f => f._id === flightId);
      setFlight(found);
      if (user) setForm(f => ({ ...f, passengerName: user.name, email: user.email }));
    });
  }, [flightId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/bookings', { ...form, flightId });
    alert('Booking requested!');
    navigate('/manage-bookings');
  };

  if (!flight) return <div>Loading flight...</div>;

  return (
    <div>
      <h3>Book {flight.flightNumber} - {flight.flightName}</h3>
      <form onSubmit={handleSubmit}>
        <input value={form.passengerName} onChange={e => setForm(f => ({...f, passengerName: e.target.value}))} required />
        <input value={form.contact} onChange={e => setForm(f => ({...f, contact: e.target.value}))} />
        <input value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
        <input type="number" value={form.totalPassengers} onChange={e => setForm(f => ({...f, totalPassengers: Number(e.target.value)}))} min={1} />
        <label><input type="checkbox" checked={form.assistanceRequired} onChange={e => setForm(f => ({...f, assistanceRequired: e.target.checked}))} /> Assistance required</label>
        <button type="submit">Request Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
