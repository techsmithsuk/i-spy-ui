import React from 'react';
import './ReportCard.scss';
import { Link } from "react-router-dom";
import { Report } from '../helpers/ReportInterface';

interface ReportCardProps {
    report: Report;
}



export function ReportCard(props: ReportCardProps) {
    return (
        <div className="reportCardMain">
                <p><b>Date of sighting: </b>{props.report.dateOfSighting}</p>
                <p><b>Place seen: </b>{props.report.location}</p>
                <p><b>Description: </b>{props.report.description}</p>
                <div className="profileButtonAlignment">
                <Link className="goToProfileButton" to={`/profile/${props.report.suspectId}`}>Go to profile</Link>
                </div>
        </div>
    )
}

