import React from 'react';
import { Link } from "react-router-dom";
import './navbar.scss';

export function Navbar() {
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
                <div className="logOut">
                    <div>
                        <Link to="/login" className="nav-element">Log Out</Link>
                    </div>
                </div>
            </nav>
    );
}

