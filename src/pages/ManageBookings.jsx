import React, { useEffect, useState } from 'react';
import API from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

const ManageBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const fetch = async () => {
    const res = await API.get('/bookings');
    setBookings(res.data);
  };

  useEffect(() => { fetch(); }, []);

  const changeStatus = async (id, status) => {
    await API.put(`/bookings/${id}/status`, { status });
    fetch();
  };

  return (
    <div>
      <h2>Manage Bookings</h2>
      <table>
        <thead><tr><th>Passenger</th><th>Flight</th><th>Passengers</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.passengerName}</td>
              <td>{b.flightNumber} {b.from}→{b.to} {new Date(b.journeyDate).toLocaleString()}</td>
              <td>{b.totalPassengers}</td>
              <td>{b.status}</td>
              <td>
                {user.role === 'admin' && b.status === 'Pending' && (
                  <>
                    <button onClick={() => changeStatus(b._id, 'Approved')}>Approve</button>
                    <button onClick={() => changeStatus(b._id, 'Rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
