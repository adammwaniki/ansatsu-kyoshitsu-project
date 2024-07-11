import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/StudentCardItem.css';

const API_URL = '/students';

function StudentCardItem({ student, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student.name,
    classroom_id: student.classroom_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await onUpdate(formData); // Call the onUpdate function passed from Student.js
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating student:', error);
      // Handle error state or display a message to the user
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="student-card">
      <div className="student-info">
        {!isEditing ? (
          <>
            <h2>{student.name}</h2>
            <p>ID: {student.id}</p>
            <p>Classroom ID: {student.classroom_id}</p>
          </>
        ) : (
          <form className="student-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </label>
            <label>
              Classroom ID:
              <input
                type="text"
                name="classroom_id"
                value={formData.classroom_id}
                onChange={handleChange}
                placeholder="Enter classroom ID"
              />
            </label>
            <div className="form-buttons">
              <button type="button" onClick={handleUpdate}>
                Save
              </button>
              <button type="button" onClick={toggleEditing}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="student-actions">
        <Link to={`/student/${student.id}`} className="action-btn details-btn">
          Details
        </Link>
        {!isEditing ? (
          <button className="action-btn update-btn" onClick={toggleEditing}>
            Update
          </button>
        ) : (
          <button className="action-btn update-btn disabled" disabled>
            Update
          </button>
        )}
        <button className="action-btn delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCardItem;
