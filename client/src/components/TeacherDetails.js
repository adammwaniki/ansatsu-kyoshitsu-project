import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/TeacherDetails.css';

const API_URL = '/teachers';

function TeacherDetails() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch teacher details');
        }
        const data = await response.json();
        setTeacher(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    fetchTeacher();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!teacher) return <div>Teacher not found</div>;

  return (
    <div className="teacher-details-container">
      <Link to="/teachers" className="back-link">← Back to Teachers</Link>
      <div className="teacher-details">
        <div className="teacher-header">
          <h1>{teacher.name}</h1>
        </div>
        <div className="teacher-info">
          <p><strong>Email:</strong> {teacher.email}</p>
          <p><strong>ID:</strong> {teacher.id}</p>
          <p><strong>Classroom:</strong> {teacher.classroom.name} (ID: {teacher.classroom.id})</p>
        </div>
        <div className="teacher-subjects">
          <h2>Subjects Taught</h2>
          {teacher.teacher_subjects.map(ts => (
            <div key={ts.id} className="subject-item">
              <h3>{ts.subject.name}</h3>
              <p><strong>Topic:</strong> {ts.topic}</p>
              <h4>Students:</h4>
              <ul>
                {ts.subject.student_subjects.map(ss => (
                  <li key={ss.id}>
                    {ss.student.name} - Topic: {ss.topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDetails;