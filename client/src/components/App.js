import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Teacher from './Teacher';
import TeacherDetails from './TeacherDetails';
import Classroom from './Classroom';
import Student from './Student';
import StudentDetails from './StudentDetails';

function App() {
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
        <Route path="/classrooms" component={Classroom} />
        <Route exact path="/students" component={Student} /> {/* Route for Student component */}
          <Route path="/student/:id" component={StudentDetails} /> {/* Route for StudentDetails component */}
      </Switch>
      
    </div>
  );
}

export default App;