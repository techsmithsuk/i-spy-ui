import React from 'react';
import './App.css';
import {Navbar} from './components/general/navbar/Navbar';
import {Person} from './components/general/Person';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Suspect from './components/Suspect/Suspect';

const App: React.FC = () => {
  return (
    <Router>
      
        <Switch>

          <Route path="/login">
            <Navbar/>
            <div>Login Page</div>
          </Route>

          <Route path="/admin">
            <Navbar/>
            <div>Admin Page</div>
          </Route>

          <Route path="/">
            
            <div>Public Page</div>
           
            <Person/>
            <Suspect/>

          </Route>          

        </Switch>

    </Router>
  );
}
export default App;