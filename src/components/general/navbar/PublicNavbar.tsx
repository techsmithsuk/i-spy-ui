import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.scss'

export function PublicNavbar() {
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

