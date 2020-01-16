import React from 'react';
import './App.css';
import {Navbar} from './components/general/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Homepage } from './components/general/AdminHomepage/Homepage';
import { ProfilePage } from './components/User-side/ProfilePage/ProfilePage';

const App: React.FC = () => {
  return (
    <Router>

      <Navbar/>
      <Switch>

        <Route path="/profile">
          <ProfilePage/>
        </Route>

        <Route path="/">
          <Homepage/>
        </Route>

      </Switch>
      
    </Router>
  );
}
export default App;
