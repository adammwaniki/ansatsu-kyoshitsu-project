import React from 'react';
import { Link } from 'react-router-dom';
import '../css/StudentCardItem.css';

function StudentCardItem({ student, onUpdate, onDelete }) {
  return (
    <div className="student-card">
      <div className="student-info">
        <h2>{student.name}</h2>
        <p>ID: {student.id}</p>
      </div>
      <div className="student-actions">
        <Link to={`/student/${student.id}`} className="action-btn details-btn">
          Details
        </Link>
        <button className="action-btn update-btn" onClick={onUpdate}>
          Update
        </button>
        <button className="action-btn delete-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCardItem;
