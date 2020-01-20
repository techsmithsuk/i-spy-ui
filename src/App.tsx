import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PublicHomepage } from './components/User-side/Homepage/PublicHomepage'
import { PublicProfilePage } from './components/User-side/ProfilePage/PublicProfilePage';
import { PublicNavbar } from './components/general/navbar/PublicNavbar';
import { LoginPage } from './components/LoginPage/LoginPage';
import { AuthContext, AuthContextProvider } from './components/AuthContext';
import { AdminHomepage } from './components/Admin-side/Homepage/AdminHomepage';
import { isContext } from 'vm';

const App: React.FC = () => {
  const context = useContext(AuthContext);
  
  return (
    <AuthContextProvider>
      <Router>

        <PublicNavbar/>
        <Switch>

          <Route exact path="/login">
            <LoginPage/>
          </Route>

          <Route exact path="/profile">
            <PublicProfilePage/>
          </Route>

          <Route exact path="/">
            <PublicHomepage/>
          </Route>
          
        </Switch>
        
      </Router>
      </AuthContextProvider>
  );
}
export default App;

