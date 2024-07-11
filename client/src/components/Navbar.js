import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/Navbar.css';

function Navbar() {
    const history = useHistory();

    const handleLogout = async () => {
        try {
            const response = await axios.delete('/logout');
            if (response.status === 204) {  // Assuming 204 is returned on successful logout
                console.log('Logged out successfully');
                // Redirect to home page
                history.push('/');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

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
            <div className="navbar-actions">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
