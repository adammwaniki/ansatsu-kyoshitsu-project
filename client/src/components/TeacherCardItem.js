import React from 'react';
import { Link } from 'react-router-dom';
import '../css/TeacherCardItem.css';

function TeacherCardItem({ teacher, onUpdate, onDelete }) {
  return (
    <div className="teacher-card">
      <div className="teacher-avatar">
        {teacher.name.charAt(0)}
      </div>
      <div className="teacher-info">
        <Link to={`/teacher/${teacher.teacher_id}`} className="teacher-name">{teacher.name}</Link>
        <span className="teacher-email">{teacher.email}</span>
      </div>
      <div className="teacher-actions">
        <button className="update-btn" onClick={function() { onUpdate(teacher.teacher_id); }}>
          Update
        </button>
        <button className="delete-btn" onClick={function() { onDelete(teacher.teacher_id); }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TeacherCardItem;