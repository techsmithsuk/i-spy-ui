import React from 'react';
import './suspectCard.scss';

export interface SuspectCardProps{
    name :string;
    image :string;
}

export function SuspectCard(props :SuspectCardProps) {
    return (
    <div className="suspectCard">
        <img src={props.image} alt="Suspect"/>
        {props.name}
    </div>
    )
}

