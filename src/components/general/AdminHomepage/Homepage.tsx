import React, { useState, useEffect } from 'react';
import {SuspectCard} from '../SuspectCard';
import { Link } from "react-router-dom";
import './homepage.scss';
import asyncJSONFetch from '../helpers/asyncJSONFetcher';
import { Suspect } from '../helpers/SuspectInterfaces';
import SuspectTrial from '../../Suspect/Suspect';


export function Homepage(){
    
    const [suspectList, setSuspectList] = useState<Suspect[] | null>(null);
    const [error, setError] = useState(false);
    let pageNumber :number = 1;
    const url: string = `${process.env.REACT_APP_API_URL}/suspects?page=${pageNumber}`
    
    
    useEffect(() => { 
        asyncJSONFetch(url)            
            .then(jsonResponse => setSuspectList(jsonResponse))   
            .catch(() => setError(true))          
    }, [url]);    

    if (error) { 
        return <div>Oh No!!! There was an error</div> 
    }

    if (!suspectList){
        return (
            <div>Fetching data...</div>
        )
    }

    return (
        <div>

            <ol className="personCardList"> 
                {suspectList.map(suspect => <div className ="child" data-testid = "SuspectCard"><SuspectCard name = {suspect.name} image = {suspect.imageUrl}/></div>)}
            </ol>

            <button>UPDATE LIST</button>
            <Link to="/new_suspect_profile">ADD NEW PROFILE</Link>
            <SuspectTrial/>

        </div>
    )
}