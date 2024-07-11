// src/components/Teacher.js
import React, { useState, useEffect } from 'react';
import TeacherCardItem from './TeacherCardItem';
import '../css/Teacher.css';
import AddTeacher from './AddTeacher';

const API_URL = '/teachers';

function Teacher() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTeachers();
  }, []);

  async function fetchTeachers() {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch teachers');
      }
      const data = await response.json();
      setTeachers(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  async function handleDelete(teacherId) {
    try {
      const response = await fetch(`${API_URL}/${teacherId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete teacher');
      }
      setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== teacherId));
    } catch (error) {
      console.error('Error deleting teacher:', error);
      // You might want to show an error message to the user here
    }
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleAddTeacherOpen() {
    setIsAddTeacherOpen(true);
  }

  function handleAddTeacherClose() {
    setIsAddTeacherOpen(false);
  }

  async function handleAddTeacher(newTeacher) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeacher),
      });
      if (!response.ok) {
        throw new Error('Failed to add teacher');
      }
      const addedTeacher = await response.json();
      setTeachers(prevTeachers => [...prevTeachers, addedTeacher]);
      setIsAddTeacherOpen(false);
    } catch (error) {
      console.error('Error adding teacher:', error);
      // You might want to show an error message to the user here
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="teacher-container">
      <div className="teacher-header">
        <h1>Our Teachers</h1>
        <input
          type="text"
          placeholder="Search Teachers..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        {/*<button className="add-teacher-btn" onClick={handleAddTeacherOpen}>
          Add Teacher
        </button>*/}
      </div>
      {isAddTeacherOpen && (
        <AddTeacher onClose={handleAddTeacherClose} onAddTeacher={handleAddTeacher} />
      )}
      <div className="teacher-grid">
        {filteredTeachers.map(teacher => (
          <TeacherCardItem 
            key={teacher.id} 
            teacher={teacher} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Teacher;
