import React, { useState, useEffect } from 'react';
import { SuspectCard } from '../../general/SuspectCard';
import './PublicHomepage.scss';
import asyncJSONFetch from '../../general/helpers/asyncJSONFetcher';
import { Suspect } from '../../general/helpers/SuspectInterfaces';
import SuspectTrial from '../../general/Suspect/Suspect';


export function PublicHomepage(){
    
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
        <div className="homepage">

            <h1>FBI Most Wanted</h1>

            <ol className="suspectCardList"> 
                {suspectList.map(suspect => <div className ="suspectCardIndiv" data-testid = "SuspectCard"><SuspectCard name = {suspect.name} image = {suspect.imageUrl}/></div>)}
            </ol>
            <SuspectTrial/>

        </div>
    )
}