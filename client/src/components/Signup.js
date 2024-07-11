// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../css/Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classroomId, setClassroomId] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signup', {
                name,
                email,
                password,
                classroom_id: classroomId
            });
            if (response.status === 201) {
                history.push('/teachers'); // Navigate to '/teachers' on successful sign-up
            }
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div>
            <div className="signup-modal">
                <div className="signup-content">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <label>Classroom ID:</label>
                            <input type="text" value={classroomId} onChange={(e) => setClassroomId(e.target.value)} required />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
