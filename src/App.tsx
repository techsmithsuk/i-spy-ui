import React from 'react';
import './App.css';
import {Navbar} from './components/general/navbar/Navbar';
import {Person} from './components/general/Person';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Suspect from './components/Suspect/Suspect';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
        <Switch>

          <Route path="/login">
            {/* Login Page */}
          </Route>

          <Route path="/admin">
            {/* Admin Page */}
          </Route>

          <Route path="/">
            {/* Public Page */}

            {/* Testing Components */}
            <Person/>
            <Suspect/>

          </Route>          

        </Switch>

    </Router>
  );
}
export default App;