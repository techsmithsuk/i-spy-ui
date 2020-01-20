import React from 'react';
import './ReportCard.scss';
import { Link } from "react-router-dom";

interface ReportCardProps {
    suspectId?: number;
    dateOf?: string;
    place?: string;
    description: string;
    timeSubmitted: string;
}


export function ReportCard(props: ReportCardProps) {
    return (
        <div className="reportCardMain">
                <p><b>Date of sighting: </b>{props.dateOf}</p>
                <p><b>Place seen: </b>{props.place}</p>
                <p><b>Description: </b>{props.description}</p>
                <div className="profileButtonAlignment">
                <Link className="goToProfileButton" to={`/profile/${props.suspectId}`}>Go to profile</Link>
                </div>
        </div>
    )
}

