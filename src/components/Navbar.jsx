import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <NavLink className="navbar-brand" to="/">FlightApp</NavLink>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {!user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
            </>
          )}

          {user && user.role === "passenger" && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/flights">Flights</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/bookings">My Bookings</NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
              </li>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/manage">Manage Bookings</NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
