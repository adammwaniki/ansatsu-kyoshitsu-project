import React, { useState } from 'react';
import '../css/UpdateTeacher.css';

const UpdateTeacher = ({ teacher, onClose, onUpdate }) => {
  const [updatedTeacher, setUpdatedTeacher] = useState({
    name: teacher.name,
    email: teacher.email,
    classroom_id: teacher.classroom_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTeacher({ ...updatedTeacher, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/teachers/${teacher.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeacher),
      });
      if (!response.ok) {
        throw new Error('Failed to update teacher');
      }
      const updatedTeacherData = await response.json();
      onUpdate(updatedTeacherData); // Pass updated data back to parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating teacher:', error);
      // Handle error state or show error message to the user
    }
  };

  return (
    <div className="update-teacher-modal">
      <div className="update-teacher-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Update Teacher</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={updatedTeacher.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={updatedTeacher.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="classroom_id">Classroom ID:</label>
            <input 
              type="number" 
              id="classroom_id" 
              name="classroom_id" 
              value={updatedTeacher.classroom_id} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="update-btn">Update Teacher</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeacher;
