import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ClassroomList() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    // Fetch the list of classrooms from an API or a static source
    const fetchClassrooms = async () => {
      const response = await fetch('/api/classrooms');
      const data = await response.json();
      setClassrooms(data);
    };
    fetchClassrooms();
  }, []);

  return (
    <div>
      <h1>Classrooms</h1>
      <ul>
        {classrooms.map((classroom) => (
          <li key={classroom.id}>
            <Link to={`/classroom/${classroom.id}`}>{classroom.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassroomList;
