import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/StudentDetails.css';

const API_URL = '/students';

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudent() {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student details');
        }
        const data = await response.json();
        setStudent(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    fetchStudent();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!student) return <div>Student not found</div>;

  return (
    <div className="student-details-container">
      <Link to="/students" className="back-link">← Back to Students</Link>
      <div className="student-details">
        <div className="student-header">
          <h1>{student.name}</h1>
        </div>
        <div className="student-info">
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Classroom:</strong> {student.classroom.name} (ID: {student.classroom.id})</p>
        </div>
        <div className="student-subjects">
          <h2>Subjects Enrolled</h2>
          {student.student_subjects.map(subject => (
            <div key={subject.id} className="subject-item">
              <h3>{subject.subject.name}</h3>
              <p><strong>Topic:</strong> {subject.topic}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;