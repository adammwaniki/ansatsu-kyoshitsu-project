import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateStudentForm from './UpdateStudentForm'; // Import the form component
import '../css/StudentCardItem.css';

const API_URL = '/students';

function StudentCardItem({ student, onUpdate, onDelete }) {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

  async function handleUpdate(updatedStudentData) {
    try {
      const response = await fetch(`${API_URL}/${student.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudentData),
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      // Trigger the onUpdate function passed from parent component
      onUpdate(student.id, updatedStudentData);
      setIsUpdateFormOpen(false); // Close the form after successful update
    } catch (error) {
      console.error('Error updating student:', error);
      // Handle error appropriately, e.g., show a toast notification
    }
  }

  return (
    <div className="student-card">
      <div className="student-avatar">{student.name.charAt(0)}</div>
      <div className="student-info">
        <h2>{student.name}</h2>
        <p>ID: {student.id}</p>
      </div>
      <div className="student-actions">
        <Link to={`/student/${student.id}`} className="action-btn details-btn">
          Details
        </Link>
        <button className="action-btn update-btn" onClick={() => setIsUpdateFormOpen(true)}>
          Update
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(student.id)}>
          Delete
        </button>
      </div>

      {/* Render the update form as a popup */}
      {isUpdateFormOpen && (
        <UpdateStudentForm
          student={student}
          onUpdate={handleUpdate}
          onClose={() => setIsUpdateFormOpen(false)}
        />
      )}
    </div>
  );
}

export default StudentCardItem;
