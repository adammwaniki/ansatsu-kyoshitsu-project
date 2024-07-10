// src/components/Teacher.js
import React, { useState, useEffect } from 'react';
import TeacherCardItem from './TeacherCardItem';
import AddTeacher from './AddTeacher';
import UpdateTeacher from './UpdateTeacher';
import '../css/Teacher.css';

const API_URL = '/teachers';

function Teacher() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [isUpdateTeacherOpen, setIsUpdateTeacherOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

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

  function handleUpdate(teacherId) {
    const teacherToUpdate = teachers.find(teacher => teacher.id === teacherId);
    setSelectedTeacher(teacherToUpdate);
    setIsUpdateTeacherOpen(true);
  }

  async function updateTeacher(teacherId, updatedTeacherData) {
    try {
      const response = await fetch(`${API_URL}/${teacherId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeacherData),
      });
      if (!response.ok) {
        throw new Error('Failed to update teacher');
      }
      const updatedTeacher = await response.json();
      setTeachers(prevTeachers => 
        prevTeachers.map(teacher => 
          teacher.id === teacherId ? { ...teacher, ...updatedTeacher } : teacher
        )
      );
      setIsUpdateTeacherOpen(false);
    } catch (error) {
      console.error('Error updating teacher:', error);
      // You might want to show an error message to the user here
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="teacher-container">
      <div className="teacher-header">
        <h1>Our Teachers</h1>
        <button className="add-teacher-btn" onClick={() => setIsAddTeacherOpen(true)}>
          Add Teacher
        </button>
      </div>
      <div className="teacher-grid">
        {teachers.map(teacher => (
          <TeacherCardItem 
            key={teacher.id} 
            teacher={teacher} 
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {isAddTeacherOpen && (
        <AddTeacher 
          onClose={() => setIsAddTeacherOpen(false)}
          onAddTeacher={handleAddTeacher}
        />
      )}
      {isUpdateTeacherOpen && selectedTeacher && (
        <UpdateTeacher 
          teacher={selectedTeacher}
          onClose={() => setIsUpdateTeacherOpen(false)}
          onUpdate={updateTeacher}
        />
      )}
    </div>
  );
}

export default Teacher;
