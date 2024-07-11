import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/Home.css'; // Import the Home.css file

function Home() {
    const history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    };

    const handleSignup = () => {
        history.push('/signup');
    };

    return (
        <div className="home-container" style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundSize: 'cover', // Ensure the image covers the entire container
            backgroundPosition: 'center', // Center the image within the container
        }}>
            <h1>Welcome to the School Management System</h1>
            <p>Please sign up or log in to access the application.</p>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}

export default Home;
