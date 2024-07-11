import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Teacher from './Teacher';
import TeacherDetails from './TeacherDetails';
import Classroom from './Classroom';
import ClassroomDetails from './ClassroomDetails';
import Student from './Student';
import StudentDetails from './StudentDetails';

function App() {
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClassrooms();
    fetchStudents();
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

  const fetchStudents = async () => {
    try {
      const response = await fetch('/students'); // Replace with your actual endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data); // Assuming data is an array of students
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
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
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/teachers" render={() => <Teacher teachers={defaultTeachers} />} />
        <Route path="/teacher/:id" render={() => <TeacherDetails teachers={defaultTeachers} />} />
        <Route exact path="/classrooms" render={() => <Classroom classrooms={classrooms} />} />
        <Route path="/classroom/:id" render={() => <ClassroomDetails classrooms={classrooms} />} />
        <Route 
          exact 
          path="/students" 
          render={(props) => <Student {...props} students={students} isLoading={isLoading} error={error} />} 
        />
        <Route 
          path="/student/:id" 
          render={(props) => <StudentDetails {...props} students={students} />} 
        />
      </Switch>
    </div>
  );
}

export default App;
