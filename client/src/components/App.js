import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClassroomList from './components/ClassroomList';
import ClassroomDetails from './components/ClassroomDetails';
import NewClassroom from './components/NewClassroom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/classroom" component={ClassroomList} />
          <Route path="/classroom/:id" component={ClassroomDetails} />
          <Route path="/new-classroom" component={NewClassroom} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
