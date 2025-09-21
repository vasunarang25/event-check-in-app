import React from "react";
import { Link } from "react-router-dom";
// import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">BUGBUSTERS</h1>
      <ul className="nav-links">
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/checkin">Check In/Out</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
