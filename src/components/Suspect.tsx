import React, { useState, useEffect } from 'react';
import fetchData from '../helpers/dataFetcher';


interface SuspectInfo {
    name: string;
}

export default function Suspect() {
    
    const [suspectInfo, setSuspectInfo] = useState<SuspectInfo | null>(null);

    const url = "http://localhost:8080/suspect";

    useEffect(
        () => { 
        fetchData(url)
        .then(jsonResponse => setSuspectInfo(jsonResponse))
    }, [url]);

    if (!suspectInfo){
        return <div>Fetching data...</div>
    }
    
    return <div>{suspectInfo.name}</div>
}