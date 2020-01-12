import React, { useState, useEffect } from 'react';
import asyncJSONfetch from '../general/helpers/asyncJSONFetcher';

interface SuspectInfo {
    name: string;
}

export default function Suspect() {

    // const [suspectInfo, setSuspectInfo] = useState<SuspectInfo | null>(null);

    // const url: string = "https://techswitch-i-spy-api-staging.herokuapp.com/suspect"

    // useEffect(
    //     () => { 
    //     asyncJSONfetch(url)
    //     .then((jsonResponse: React.SetStateAction<SuspectInfo | null>) => setSuspectInfo(jsonResponse))
    // }, [url]);

    // if (!suspectInfo){
    //     return (
    //         <div>
    //             Fetching data...
    //         </div>
    //     )
    // }

    return (
        <div>
            Testing
            {/* {suspectInfo.name} */}
        </div>
    )
}