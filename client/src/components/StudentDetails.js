import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/StudentDetails.css'; // Import CSS file for styling

const StudentDetails = ({ students }) => {
  const { id } = useParams();

  const student = students.find(s => s.id === parseInt(id));

  if (!student) {
    return <div>Student not found.</div>;
  }

  return (
    <div className="student-details">
      <h2>{student.name}</h2>
      <h3>Subjects:</h3>
      <ol>
        {student.student_subjects.map(subject => (
          <li key={subject.id}>
            {subject.subject.name} - Topic: {subject.topic}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StudentDetails;
