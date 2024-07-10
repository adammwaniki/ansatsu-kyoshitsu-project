import React, { useState } from 'react';
import '../css/AddTeacher.css';

function AddTeacher({ onClose, onAddTeacher }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [classroomId, setClassroomId] = useState('');
  const [subjectId, setSubjectId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a new teacher object
    const newTeacher = {
      name,
      email,
      classroom_id: classroomId,
      subject_id: subjectId
    };

    try {
      // Send POST request to backend
      const response = await fetch('http://your-api-url/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeacher),
      });

      if (!response.ok) {
        throw new Error('Failed to add teacher');
      }

      const addedTeacher = await response.json();
      
      // Call the onAddTeacher function passed from the parent component
      onAddTeacher(addedTeacher);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error adding teacher:', error);
      // You might want to show an error message to the user here
    }
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
              type="text"
              id="classroomId"
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subjectId">Subject ID:</label>
            <input
              type="text"
              id="subjectId"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
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