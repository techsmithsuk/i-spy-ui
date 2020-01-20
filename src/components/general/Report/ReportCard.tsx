import React from 'react';
import './ReportCard.scss';

interface ReportCardProps {
    dateOf?: string;
    place?: string;
    description: string;
}


export function ReportCard(props: ReportCardProps) {
    return (
        <div className="reportCardMain">
                <p><b>Date of sighting: </b>{props.dateOf}</p>
                <p><b>Place seen: </b>{props.place}</p>
                <p><b>Description: </b>{props.description}</p>
        </div>
    )
}

