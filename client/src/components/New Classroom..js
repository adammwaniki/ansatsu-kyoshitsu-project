import React, { useState } from 'react';

function NewClassroom() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new classroom
    await fetch('/api/classrooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    // Redirect or update state after creation
  };

  return (
    <div>
      <h1>Create New Classroom</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Classroom Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewClassroom;
