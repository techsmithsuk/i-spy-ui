import React from 'react';
import './App.css';
import {Navbar} from './components/general/navbar/Navbar';
import {Person} from './components/general/Person';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Suspect from './components/Suspect';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Person/>
      <Suspect/>
    </Router>
  );
}
export default App;
