import React from 'react';
import MyForm from './Components/MyForm';
import Users from './Components/Users';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MyForm />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route>
          <MyForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
