import React from 'react';
import './person.scss';

interface PersonProps{
    name :string;
    image :string;
}

export function Person(props :PersonProps) {
    return (
    <div className="personCard">
        <img src={props.image} alt="Image of Suspect"/>
        {props.name}
    </div>
    )
}

