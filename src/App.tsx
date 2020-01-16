import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PublicHomepage } from './components/User-side/Homepage/PublicHomepage'
import { PublicProfilePage } from './components/User-side/ProfilePage/PublicProfilePage';
import { PublicNavbar } from './components/general/navbar/PublicNavbar';

const App: React.FC = () => {
  return (
    <Router>

      <PublicNavbar/>
      <Switch>

        <Route path="/profile">
          <PublicProfilePage/>
        </Route>

        <Route path="/">
          <PublicHomepage/>
        </Route>

      </Switch>
      
    </Router>
  );
}
export default App;
