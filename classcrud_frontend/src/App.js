import React from "react";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import ProfessorProfile from "./Components/ProfessorProfile";
import StudentProfile from "./Components/StudentProfile";
import ClassesList from "./Components/ClassesList";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/profile/professor/:id" component={ProfessorProfile} />
          <Route path="/profile/student/:id" component={StudentProfile} />
          <Route path="/register/" component={Register} />
          <Route path="/classes/" component={ClassesList} />
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
