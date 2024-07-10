import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/TeacherDetails.css';

function TeacherDetails({ teachers }) {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const foundTeacher = teachers.find(t => t.teacher_id === parseInt(id));
    setTeacher(foundTeacher);

    // Mock data for teacher assignments
    const mockAssignments = [
      { id: 1, classroom: "Room 101", subject: "Mathematics", grade: "9th Grade" },
      { id: 2, classroom: "Room 205", subject: "Advanced Algebra", grade: "11th Grade" },
      { id: 3, classroom: "Room 103", subject: "Geometry", grade: "10th Grade" },
    ];
    setAssignments(mockAssignments);
  }, [id, teachers]);

  if (!teacher) {
    return (
      <div className="teacher-not-found">
        <h2>Teacher Not Found</h2>
        <Link to="/teachers" className="back-link">Back to Teachers List</Link>
      </div>
    );
  }

  return (
    <div className="teacher-details-container">
      <Link to="/teachers" className="back-link">← Back to Teachers</Link>
      <div className="teacher-details">
        <div className="teacher-header">
          <div className="teacher-avatar">
            {teacher.name.charAt(0)}
          </div>
          <h1>{teacher.name}</h1>
        </div>
        <div className="teacher-info">
          <div className="info-section">
            <h2>Contact Information</h2>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Phone:</strong> {teacher.phone || 'N/A'}</p>
          </div>
          <div className="info-section">
            <h2>Professional Details</h2>
            <p><strong>ID:</strong> {teacher.teacher_id}</p>
            <p><strong>Years of Experience:</strong> {teacher.experience || 'N/A'}</p>
            <p><strong>Education:</strong> {teacher.education || 'N/A'}</p>
          </div>
          <div className="info-section">
            <h2>Additional Information</h2>
            <p><strong>Department:</strong> {teacher.department || 'N/A'}</p>
            <p><strong>Office Hours:</strong> {teacher.officeHours || 'N/A'}</p>
          </div>
        </div>
        <div className="teacher-assignments">
          <h2>Current Assignments</h2>
          {assignments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Classroom</th>
                  <th>Subject</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map(assignment => (
                  <tr key={assignment.id}>
                    <td>{assignment.classroom}</td>
                    <td>{assignment.subject}</td>
                    <td>{assignment.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No current assignments.</p>
          )}
        </div>
        <div className="teacher-bio">
          <h2>Biography</h2>
          <p>{teacher.bio || 'No biography available.'}</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetails;