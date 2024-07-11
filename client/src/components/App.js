import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Teacher from './Teacher';
import TeacherDetails from './TeacherDetails';
import Classroom from './Classroom';
import ClassroomDetails from './ClassroomDetails';
import Student from './Student';
import StudentDetails from './StudentDetails';

function App() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const response = await fetch('/classrooms'); // Replace with your actual endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch classrooms');
      }
      const data = await response.json();
      setClassrooms(data); // Assuming data is an array of classrooms
    } catch (error) {
      console.error('Error fetching classrooms:', error);
    }
  };

  const defaultTeachers = [
    { teacher_id: 1, name: "John Doe", email: "john.doe@school.com" },
    { teacher_id: 2, name: "Jane Smith", email: "jane.smith@school.com" },
    { teacher_id: 3, name: "Bob Johnson", email: "bob.johnson@school.com" },
    { teacher_id: 4, name: "Alice Williams", email: "alice.williams@school.com" },
    { teacher_id: 5, name: "Charlie Brown", email: "charlie.brown@school.com" }
  ];

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/teachers" render={() => <Teacher teachers={defaultTeachers} />} />
        <Route path="/teacher/:id" render={() => <TeacherDetails teachers={defaultTeachers} />} />
        <Route exact path="/classrooms" render={() => <Classroom classrooms={classrooms} />} />
        <Route path="/classroom/:id" render={() => <ClassroomDetails classrooms={classrooms} />} />
        <Route exact path="/students" component={Student} />
        <Route path="/student/:id" component={StudentDetails} />
      </Switch>
    </div>
  );
}

export default App;
