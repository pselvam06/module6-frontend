import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/';

// Create axios instance for auth
export const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance for flights
export const flightsAPI = axios.create({
  baseURL: `${BASE_URL}/flights`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance for bookings
export const bookingsAPI = axios.create({
  baseURL: `${BASE_URL}/bookings`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
const setAuthToken = (token) => {
  if (token) {
    authAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    flightsAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    bookingsAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete authAPI.defaults.headers.common['Authorization'];
    delete flightsAPI.defaults.headers.common['Authorization'];
    delete bookingsAPI.defaults.headers.common['Authorization'];
  }
};

// Get token from localStorage and set it
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export default setAuthToken;