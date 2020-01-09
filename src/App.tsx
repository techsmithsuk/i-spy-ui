import React from 'react';
import './App.css';
import {Navbar} from './components/general/navbar/navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
    </Router>
  );
}

export default App;
