import React from 'react';
import { Link } from "react-router-dom";
import './ProfilePage.scss';

export function ProfilePage() {
    return (
        <div className="profilePage">
        <div className="reportSightingButton">
            <Link className="indivButton" to="/profile/createReport">REPORT A SIGHTING</Link>
        </div>
        </div>
    )
}