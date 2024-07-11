import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/TeacherCardItem.css';

function TeacherCardItem({ teacher, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(teacher.name);
  const [updatedEmail, setUpdatedEmail] = useState(teacher.email);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await onUpdate(teacher.id, { name: updatedName, email: updatedEmail });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedName(teacher.name);
    setUpdatedEmail(teacher.email);
  };

  return (
    <div className="teacher-card">
      <div className="teacher-avatar">{teacher.name.charAt(0)}</div>
      <div className="teacher-info">
        {isEditing ? (
          <>
            <div className="form-group">
              <label htmlFor={`name-${teacher.id}`}>Name:</label>
              <input
                type="text"
                id={`name-${teacher.id}`}
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`email-${teacher.id}`}>Email:</label>
              <input
                type="email"
                id={`email-${teacher.id}`}
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <h2>{teacher.name}</h2>
            <p>{teacher.email}</p>
          </>
        )}
      </div>
      <div className="teacher-actions">
        <Link to={`/teacher/${teacher.id}`} className="action-btn details-btn">Details</Link>
        {
          showUpdate &&(
            <>
            <button
          className="action-btn update-btn"
          onClick={handleUpdateClick}
          disabled={isEditing}
        >
          Update
        </button>
            </>
          )
        }
        
        {isEditing && (
          <>
            <button className="action-btn save-btn" onClick={handleSaveClick}>
              Save
            </button>
            <button className="action-btn cancel-btn" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        )}
        <button className="action-btn delete-btn" onClick={() => onDelete(teacher.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TeacherCardItem;
