import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, AdminHomePage } from './components/User-side/Homepage/PublicHomepage'
import { PublicProfilePage } from './components/User-side/ProfilePage/PublicProfilePage';
import { PublicNavbar } from './components/general/navbar/PublicNavbar';
import { LoginPage } from './components/LoginPage/LoginPage';
import { AuthContext, AuthContextProvider } from './components/AuthContext';
import { ViewAllReports } from './components/Admin-side/ViewAllReports/ViewAllReports';

const App: React.FC = () => {
  
  return (
    <AuthContextProvider>
      <Router>

        <PublicNavbar/>
        <Switch>
          
          <Route exact path="/">
            <HomePage/>
          </Route>
          
          <Route exact path="/login">
            <LoginPage/>
          </Route>
          
          <Route exact path="/profile/:id">
            <PublicProfilePage/>
          </Route>
          
            <AdminPages/>

        </Switch>
        
      </Router>
    </AuthContextProvider>
  );
}

export function AdminPages() {
  const context = useContext(AuthContext);
  if (!context.loggedIn) {
    return <LoginPage/>
  }

  return (
    <div>
      <Route exact path="/admin/reports">
        <ViewAllReports/>
      </Route>

      <Route exact path="/admin">
        <AdminHomePage/>
      </Route>
    </div>
  );
}

export default App;


