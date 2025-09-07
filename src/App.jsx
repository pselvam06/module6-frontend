<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Flights from './pages/Flights';
import BookFlight from './pages/BookingFlight';
import MyBookings from './pages/MyBooking';
import AdminBookings from './pages/AdminBooking';
import AdminFlights from './pages/AdminFlights';
import PrivateRoute from './components/PrivateRoute';
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flights from "./pages/Flights";
import BookingForm from "./pages/BookingForm";
import ManageBookings from "./pages/ManageBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
>>>>>>> 82e1e21 (first commit)

function App() {
  return (
    <AuthProvider>
      <Router>
<<<<<<< HEAD
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/book/:flightId" element={
              <PrivateRoute>
                <BookFlight />
              </PrivateRoute>
            } />
            <Route path="/my-bookings" element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            } />
            <Route path="/admin/bookings" element={
              <PrivateRoute adminOnly={true}>
                <AdminBookings />
              </PrivateRoute>
            } />
            <Route path="/admin/flights" element={
              <PrivateRoute adminOnly={true}>
                <AdminFlights />
              </PrivateRoute>
            } />
          </Routes>
        </div>
=======
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Passenger routes */}
          <Route
            path="/flights"
            element={
              <ProtectedRoute>
                <Flights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingForm />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/manage"
            element={
              <AdminRoute>
                <ManageBookings />
              </AdminRoute>
            }
          />
        </Routes>
>>>>>>> 82e1e21 (first commit)
      </Router>
    </AuthProvider>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 82e1e21 (first commit)
