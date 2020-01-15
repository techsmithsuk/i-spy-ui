import React from 'react';
import './App.css';
import {Navbar} from './components/general/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Homepage } from './components/general/AdminHomepage/Homepage';
import Suspect from './components/Suspect/Suspect';

const App: React.FC = () => {
  return (
    <Router>

      <Navbar/>
      <Switch>

        <Route path="/">
          <Homepage/>
        </Route>

      </Switch>
      
    </Router>
  );
}
export default App;
