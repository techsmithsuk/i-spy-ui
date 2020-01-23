import React, { useState, useEffect, useContext } from 'react';
import { SuspectCard } from '../../general/SuspectCard';
import './PublicHomepage.scss';
import { Link } from "react-router-dom";
import {asyncJSONFetch} from '../../general/helpers/asyncJSONFetcher';
import { Suspect } from '../../general/helpers/SuspectInterfaces';
import { AuthContext } from '../../AuthContext';


export function PublicHomepage(){
    
    const context = useContext(AuthContext);
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

    if(context.loggedIn) {
        return (
            <div className="homepage">

                <h1>FBI Most Wanted</h1>

                <ol className="suspectCardList"> 
                    {suspectList.map(suspect => <div className ="suspectCardIndiv" data-testid = "SuspectCard">
                        <SuspectCard name = {suspect.title} image = "suspect image"/></div>)}
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
                {suspectList.map(suspect => <Link to={`/profile/${suspect.id}`} className ="suspectCardIndiv" data-testid = "SuspectCard"><SuspectCard name = {suspect.title} image = "suspect image"/></Link>)}
            </ol>
        </div>
    )
}