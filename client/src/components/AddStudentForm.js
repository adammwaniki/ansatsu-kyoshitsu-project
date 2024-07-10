import React from 'react';

function AddStudentForm({ newStudentData, onInputChange, onAddStudent, onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddStudent(newStudentData);
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
            onChange={onInputChange}
            required
          />
        </label>
        <label>
          Classroom ID:
          <input
            type="number"
            name="classroom_id"
            value={newStudentData.classroom_id}
            onChange={onInputChange}
            required
          />
        </label>
        <label>
          Subject ID:
          <input
            type="number"
            name="subject_id"
            value={newStudentData.subject_id}
            onChange={onInputChange}
            required
          />
        </label>
        <div className="form-buttons">
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddStudentForm;
