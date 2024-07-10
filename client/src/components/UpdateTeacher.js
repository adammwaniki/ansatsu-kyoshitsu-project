import React, { useState, useEffect } from 'react';
import '../css/UpdateTeacher.css';

function UpdateTeacher({ teacher, onClose, onUpdate }) {
  const [name, setName] = useState(teacher.name);
  const [email, setEmail] = useState(teacher.email);
  const [classroomId, setClassroomId] = useState(teacher.classroom_id);

  useEffect(() => {
    setName(teacher.name);
    setEmail(teacher.email);
    setClassroomId(teacher.classroom_id);
  }, [teacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedTeacher = {
      name,
      email,
      classroom_id: parseInt(classroomId),
    };

    await onUpdate(teacher.id, updatedTeacher);
    onClose();
  };

  return (
    <div className="update-teacher-modal">
      <div className="update-teacher-content">
        <h2>Update Teacher</h2>
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
          <div className="form-actions">
            <button type="submit">Update Teacher</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTeacher;