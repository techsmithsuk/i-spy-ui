import React from 'react';
import { Link } from 'react-router-dom';

export function ReportSightingButton() {
    return (
        <div className="reportSightingButton">
                <Link className="indivButton" to="/profile/:id/create-report">REPORT A SIGHTING</Link>
            </div>
    )};