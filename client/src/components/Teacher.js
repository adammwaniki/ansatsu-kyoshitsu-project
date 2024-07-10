import React, { useState } from 'react';
import TeacherCardItem from './TeacherCardItem';
import AddTeacher from './AddTeacher';
import '../css/Teacher.css';

function Teacher({ teachers, setTeachers }) {
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);

  function handleUpdate(teacherId) {
    console.log(`Update teacher with ID: ${teacherId}`);
    // Implement update logic here
  }

  function handleDelete(teacherId) {
    console.log(`Delete teacher with ID: ${teacherId}`);
    // Implement delete logic here
  }

  function handleAddTeacher(newTeacher) {
    // This function will be passed to AddTeacher component
    // It will update the teachers state with the new teacher
    setTeachers([...teachers, newTeacher]);
    setIsAddTeacherOpen(false);
  }

  return (
    <div className="teacher-container">
      <div className="teacher-header">
        <h1>Our Teachers</h1>
        <button className="add-teacher-btn" onClick={() => setIsAddTeacherOpen(true)}>
          Add Teacher
        </button>
      </div>
      <div className="teacher-list">
        {teachers.map(function(teacher) {
          return (
            <TeacherCardItem 
              key={teacher.teacher_id} 
              teacher={teacher} 
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
      {isAddTeacherOpen && (
        <AddTeacher 
          onClose={() => setIsAddTeacherOpen(false)}
          onAddTeacher={handleAddTeacher}
        />
      )}
    </div>
  );
}

export default Teacher;