import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PublicHomepage } from './components/User-side/Homepage/PublicHomepage'
import { PublicProfilePage } from './components/User-side/ProfilePage/PublicProfilePage';
import { PublicNavbar } from './components/general/navbar/PublicNavbar';
import { LoginPage } from './components/LoginPage/LoginPage';
import { AuthContext, AuthContextProvider } from './components/AuthContext';

const App: React.FC = () => {
  const state = useContext(AuthContext);
  
  return (
    <AuthContextProvider>
      <Router>

        <PublicNavbar/>
        <Switch>

          <Route path="/login">
            <LoginPage/>
          </Route>

          <Route path="/profile">
            <PublicProfilePage/>
          </Route>

          <Route path="/">
            <PublicHomepage/>
          </Route>

        </Switch>
        
      </Router>
      </AuthContextProvider>
  );
}
export default App;
