import React, { useState, useEffect, useContext } from 'react';
import { SuspectCard } from '../../general/SuspectCard';
import './PublicHomepage.scss';
import { Link } from "react-router-dom";
import {asyncJSONFetch} from '../../general/helpers/asyncJSONFetcher';
import { Suspect } from '../../general/helpers/SuspectInterfaces';
import { AuthContext } from '../../AuthContext';

interface JsonSuspectResponse{
    items : Suspect[],
    totalNumberOfItems: number,
    previousPage: string | null,
    nextPage: string | null
}


export function PublicHomepage(){
    
    const context = useContext(AuthContext);
    const [jsonList, setSuspectList] = useState<JsonSuspectResponse | null>(null);
    const [error, setError] = useState(false);
    let pageNumber :number = 1;
    const url: string = `${process.env.REACT_APP_API_URL}/suspects?page=${pageNumber}`

    useEffect(() => { 
        asyncJSONFetch(url)            
            .then(jsonResponse => setSuspectList(jsonResponse))  
            .catch(() => setError(true))          
    }, [url]);    

    console.log(jsonList)
    if (error) { 
        return <div>Oh No!!! There was an error</div> 
    }

    if (!jsonList){
        return (
            <div>Fetching data...</div>
        )
    }

    if(context.loggedIn) {
        return (
            <div className="homepage">

                <h1>FBI Most Wanted</h1>

                <ol className="suspectCardList"> 
                    {jsonList.items.map(suspect => <div className ="suspectCardIndiv" data-testid = "SuspectCard">
                        <SuspectCard name = {suspect.title} image = {suspect.imageUrl}/></div>)}
                </ol>

                <div className="buttons">
                    <button className="indivButton">UPDATE LIST</button>
                    <Link className="indivButton" to="/new_suspect_profile">ADD NEW PROFILE</Link>
                </div>

            </div>
        )
    }

    return (
        <div className="homepage">

            <h1>FBI Most Wanted</h1>

            <ol className="suspectCardList"> 
                {jsonList.items.map(suspect => <Link to={`/profile/${suspect.id}`} className ="suspectCardIndiv" data-testid = "SuspectCard"><SuspectCard name = {suspect.title} image = {suspect.imageUrl}/></Link>)}
            </ol>
        </div>
    )
}