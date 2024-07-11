import React, { useState, useEffect } from 'react';

function UpdateStudentForm({ student, onUpdate, onClose }) {
  const [updatedStudentData, setUpdatedStudentData] = useState({
    name: student.name,
    classroom_id: student.classroom_id,
  });

  useEffect(() => {
    setUpdatedStudentData({
      name: student.name,
      classroom_id: student.classroom_id,
    });
  }, [student]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(student.id, updatedStudentData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedStudentData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="update-student-form">
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedStudentData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Classroom ID:
          <input
            type="number"
            name="classroom_id"
            value={updatedStudentData.classroom_id}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className="form-buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateStudentForm;
