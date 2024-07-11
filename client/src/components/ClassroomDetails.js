import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import '../css/ClassroomDetails.css'; // Import CSS file for styling

const ClassroomDetails = ({ classrooms }) => {
  const { id } = useParams(); // Get classroom id from URL parameter

  // Find the classroom with the matching id
  const classroom = classrooms.find(c => c.id === parseInt(id));

  if (!classroom) {
    return <div>Classroom not found.</div>;
  }

  return (
    <div className="classroom-details">
      <h2>{classroom.name}</h2>
      <h3>Students:</h3>
      <ul>
        {classroom.students.map(student => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClassroomDetails;
