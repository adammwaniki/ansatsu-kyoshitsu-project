import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://freepngimg.com/thumb/school/23632-2-school-thumb.png" alt="School Logo" />
      </div>
      <ul className="navbar-links">
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/teachers" activeClassName="active">Teachers</NavLink></li>
        <li><NavLink to="/classrooms" activeClassName="active">Classrooms</NavLink></li>
        <li><NavLink to="/students" activeClassName="active">Students</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;