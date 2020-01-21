import React, { useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
import './PublicNavbar.scss'
import { AuthContext } from '../../AuthContext';


export function PublicNavbar() {
    const context = useContext(AuthContext);

    function handleClick() {
        console.log("handling the click");
        console.log("changed the loggin state", context.loggedIn);
        context.setToken("");
        console.log("changed the token state", context.token, context.loggedIn);
    }

    console.log("rendering the app: ", context.loggedIn);
    if(context.loggedIn) {
        return (
            <nav>
                <div className="main-nav-elements">
                    <div>
                        <Link to="/" className="nav-element">Home</Link>
                    </div>
                    <div>
                        <Link to="/reports" className="nav-element">Reports</Link>
                    </div>
                    <div className="super-admin">
                        <Link to="/users" className="nav-element">Manage Users</Link>
                    </div>
                    <div className="super-admin">
                        <Link to="/settings" className="nav-element">Admin Settings</Link>
                    </div>
                </div>
                <div className="logOut" >
                    <Link to="/" className="nav-element" onClick={handleClick}>Log Out</Link>
                </div>
            </nav>
        );
    }

    return (
            <nav>
                <div className="main-nav-elements">
                    <div>
                        <Link to="/" className="nav-element">Home</Link>
                    </div>
                </div>
                <div className="login">
                    <div>
                        <Link to="/login" className="nav-element">Login</Link>
                    </div>
                </div>
            </nav>
    );
}

