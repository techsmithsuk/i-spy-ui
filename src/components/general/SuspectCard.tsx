import React from 'react';
import './suspectCard.scss';

interface SuspectCardProps{
    name :string;
    image :string;
}

export function SuspectCard(props :SuspectCardProps) {
    return (
    <div className="suspectCard">
        <img src={props.image} alt="Image of Suspect"/>
        {props.name}
    </div>
    )
}

