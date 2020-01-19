import React from 'react';
import { Link } from "react-router-dom";
import './PublicProfilePage.scss';

export function PublicProfilePage() {
    return (
        <div className="profilePage">
        <div className="reportSightingButton">
            <Link className="indivButton" to="/profile/createReport">REPORT A SIGHTING</Link>
        </div>
        </div>
    )
}