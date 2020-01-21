import React, { useState, useEffect } from 'react';
import {asyncJSONFetch} from '../helpers/asyncJSONFetcher';


interface SuspectTrialInfo {
    name: string;
}

export default function SuspectTrial() {

    const [suspectInfo, setSuspectInfo] = useState<SuspectTrialInfo | null>(null);
    const [error, setError] = useState(false);

    const url: string = `${process.env.REACT_APP_API_URL}/suspect_test`
    
    useEffect(() => { 
        asyncJSONFetch(url)            
            .then(jsonResponse => setSuspectInfo(jsonResponse))   
            .catch(() => setError(true))          
    }, [url]);    

    if (error) { 
        return <div>Oh No!!! There was an error</div> 
    }

    if (!suspectInfo){
        return (
            <div>Fetching data...</div>
        )
    }
    
    return ( 
        <div>
            {suspectInfo.name}
        </div>
    )
}