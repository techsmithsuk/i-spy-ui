import React, { useState, useEffect } from 'react';
import asyncJSONFetch from '../general/helpers/asyncJSONFetcher';

interface SuspectInfo {
    name: string;
}

const defaultSuspect = {
    name: "Fetching data..."
}

export default function Suspect() {

    const [suspectInfo, setSuspectInfo] = useState<SuspectInfo>(defaultSuspect);

    const url: string = "https://techswitch-i-spy-api-staging.herokuapp.com/suspect"

    useEffect(
        () => { 
        asyncJSONFetch(url)
        .then((jsonResponse) => setSuspectInfo(jsonResponse))
    }, [url]);    

    // TODO Check with Mike if this does what I think it does
    // This may now be un-needed if default state above is a correct use
    return (
        <div>   
            {suspectInfo.name}
        </div>
    )
}