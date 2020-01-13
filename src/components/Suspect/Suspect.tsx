import React, { useState, useEffect } from 'react';
import asyncJSONFetch from '../general/helpers/asyncJSONFetcher';


interface SuspectInfo {
    name: string;
}

export default function Suspect() {

    const [suspectInfo, setSuspectInfo] = useState<SuspectInfo | null>(null);
    const [error, setError] = useState<boolean>(false);

    const url: string = "https://techswitch-i-spy-api-staging.herokuapp.com/suspect";
    
    useEffect(() => { 
        asyncJSONFetch(url)            
            .then(jsonResponse => setSuspectInfo(jsonResponse))   
            .catch(() => setError(true))         
            
    }, [url]);

    if (error) {
        return <div>Oh No!!! There was an error</div>;
    }

    if (!suspectInfo){
        return <div>Fetching data...</div>;
    }

    return <div>{suspectInfo.name}</div>;
}