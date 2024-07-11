import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentCardItem from './StudentCardItem';
import AddStudentForm from './AddStudentForm';
import '../css/Student.css';

const API_URL = '/students';

function Student() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    classroom_id: '',
    subject_id: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  async function addStudent(newStudent) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      const addedStudent = await response.json();
      setStudents(prevStudents => [...prevStudents, addedStudent]);
      setIsAddStudentOpen(false);
      setNewStudentData({ name: '', classroom_id: '', subject_id: '' }); // Reset form data
    } catch (error) {
      console.error('Error adding student:', error);
      
    }
  }

  async function updateStudent(studentId, updatedStudentData) {
    try {
      const response = await fetch(`${API_URL}/${studentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStudentData),
      });
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      const updatedStudent = await response.json();
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === studentId ? { ...student, ...updatedStudent } : student
        )
      );
    } catch (error) {
      console.error('Error updating student:', error);
      
    }
  }

  async function deleteStudent(studentId) {
    try {
      const response = await fetch(`${API_URL}/${studentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      setStudents(prevStudents => prevStudents.filter(student => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
      
    }
  }

  function handleAddStudentOpen() {
    setIsAddStudentOpen(true);
  }

  function handleAddStudentClose() {
    setIsAddStudentOpen(false);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewStudentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  function filteredStudents() {
    return students.filter(student => {
      return (
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.classroom_id.toString().includes(searchQuery)
      );
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="student-container">
      <div className="student-header">
        <h1>Students</h1>
        <button className="add-student-btn" onClick={handleAddStudentOpen}>
          Add Student
        </button>
        <input
          type="text"
          placeholder="Search by name or classroom ID"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      {isAddStudentOpen && (
        <AddStudentForm
          onClose={handleAddStudentClose}
          onAddStudent={addStudent}
          newStudentData={newStudentData}
          onInputChange={handleInputChange}
        />
      )}
      <div className="student-list">
        {filteredStudents().map(student => (
          <StudentCardItem
            key={student.id}
            student={student}
            onDelete={() => deleteStudent(student.id)}
            onUpdate={(updatedData) => updateStudent(student.id, updatedData)}
          />
        ))}
      </div>
    </div>
  );
}

export default Student;
