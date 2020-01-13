import React from 'react';
import './App.css';
import {Navbar} from './components/general/navbar/Navbar';
import {Person} from './components/general/Person';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Homepage } from './components/general/AdminHomepage/Homepage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Homepage/>
    </Router>
  );
}
export default App;
