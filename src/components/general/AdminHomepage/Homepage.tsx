import React from 'react';
import {Person} from '../Person';
import {allSuspects} from './FakeApiRequest'
import { Link } from "react-router-dom";
import './homepage.scss';

export function Homepage(){
    let suspectList :any[] = allSuspects();
    return (
        <div>
        <ol className="personCardList"> 
            {suspectList.map(suspect => <div className ="child"><Person name = {suspect.name} image = {suspect.imageUrl}/></div>)}
        </ol>
        <button>UPDATE LIST</button>
        <Link to="/new_suspect_profile">ADD NEW PROFILE</Link>
        </div>
    )
}