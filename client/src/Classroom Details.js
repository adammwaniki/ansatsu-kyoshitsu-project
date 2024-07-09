import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ClassroomDetails() {
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);

  useEffect(() => {
    // Fetch the classroom details from an API or a static source
    const fetchClassroom = async () => {
      const response = await fetch(`/api/classrooms/${id}`);
      const data = await response.json();
      setClassroom(data);
    };
    fetchClassroom();
  }, [id]);

  const handleDelete = async () => {
    // Delete the classroom
    await fetch(`/api/classrooms/${id}`, { method: 'DELETE' });
    // Redirect or update state after deletion
  };

  if (!classroom) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{classroom.name}</h1>
      <h2>Students</h2>
      <ul>
        {classroom.students.map((student) => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>{student.name}</Link>
          </li>
        ))}
      </ul>
      <button onClick={handleDelete}>Delete Classroom</button>
      {/* Add update functionality here */}
    </div>
  );
}

export default ClassroomDetails;
