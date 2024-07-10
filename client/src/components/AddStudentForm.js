import React, { useState } from 'react';

function AddStudentForm({ onAddStudent, onClose }) {
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    classroom_id: '',
    subject_id: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddStudent(newStudentData);
    setNewStudentData({
      name: '',
      classroom_id: '',
      subject_id: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudentData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="add-student-form">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newStudentData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Classroom ID:
          <input
            type="number"
            name="classroom_id"
            value={newStudentData.classroom_id}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Subject ID:
          <input
            type="number"
            name="subject_id"
            value={newStudentData.subject_id}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className="form-buttons">
          <button type="submit">Add Student</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddStudentForm;
