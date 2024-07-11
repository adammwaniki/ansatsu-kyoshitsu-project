import React from 'react';
import ClassroomCard from './ClassroomCard';
import '../css/Classroom.css'; // Import CSS file for styling

const Classroom = ({ classrooms }) => {
  return (
    <div className="classroom-list">
      {classrooms.map(classroom => (
        <ClassroomCard key={classroom.id} classroom={classroom} />
      ))}
    </div>
  );
}

export default Classroom;
