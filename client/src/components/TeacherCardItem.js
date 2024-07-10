import React from 'react';
import { Link } from 'react-router-dom';
import '../css/TeacherCardItem.css';

function TeacherCardItem({ teacher, onUpdate, onDelete }) {
  return (
    <div className="teacher-card">
      <div className="teacher-avatar">{teacher.name.charAt(0)}</div>
      <div className="teacher-info">
        <h2>{teacher.name}</h2>
        <p>{teacher.email}</p>
      </div>
      <div className="teacher-actions">
        <Link to={`/teacher/${teacher.id}`} className="action-btn details-btn">Details</Link>
        <button className="action-btn update-btn" onClick={() => onUpdate(teacher.id)}>
          Update
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(teacher.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TeacherCardItem;