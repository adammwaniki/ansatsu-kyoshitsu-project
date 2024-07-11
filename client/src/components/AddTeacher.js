import React, { useState } from 'react';
import '../css/AddTeacher.css';

function AddTeacher({ onClose, onAddTeacher }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [classroomId, setClassroomId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newTeacher = {
      name,
      email,
      classroom_id: parseInt(classroomId),
      password
    };

    await onAddTeacher(newTeacher);
  };

  return (
    <div className="add-teacher-modal">
      <div className="add-teacher-content">
        <h2>Add New Teacher</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="classroomId">Classroom ID:</label>
            <input
              type="number"
              id="classroomId"
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit">Add Teacher</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;