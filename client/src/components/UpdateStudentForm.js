import React, { useState } from 'react';

const UpdateStudentForm = ({ student, onUpdate, onClose }) => {
  const [updatedName, setUpdatedName] = useState(student.name);
  const [updatedClassroomId, setUpdatedClassroomId] = useState(student.classroom_id);

  function handleSubmit(event) {
    event.preventDefault();
    const updatedStudentData = {
      name: updatedName,
      classroom_id: updatedClassroomId,
    };
    onUpdate(updatedStudentData);
  }

  return (
    <div className="update-student-form-container">
      <div className="update-student-form">
        <h2>Update Student</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              required
            />
          </label>
          <label>
            Classroom ID:
            <input
              type="number"
              value={updatedClassroomId}
              onChange={(e) => setUpdatedClassroomId(parseInt(e.target.value))}
              required
            />
          </label>
          <div className="form-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentForm;
