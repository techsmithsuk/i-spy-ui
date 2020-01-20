import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PublicHomepage } from './components/User-side/Homepage/PublicHomepage'
import { PublicProfilePage } from './components/User-side/ProfilePage/PublicProfilePage';
import { PublicNavbar } from './components/general/navbar/PublicNavbar';
import { AdminHomepage } from './components/Admin-side/Homepage/AdminHomepage';
import { ViewAllReports } from './components/general/Report/ViewAllReports';

const App: React.FC = () => {
  return (
    <Router>

      <PublicNavbar/>
      <Switch>

        <Route path="/profile">
          <PublicProfilePage/>
        </Route>

        <Route path="/reports">
          <ViewAllReports/>
        </Route>

        <Route path="/admin">
          <AdminHomepage/>
        </Route>
        
        <Route path="/">
          <PublicHomepage/>
        </Route>

      </Switch>
      
    </Router>
  );
}
export default App;
