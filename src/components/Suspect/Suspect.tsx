import React, { useState, useEffect } from 'react';
import asyncJSONFetch from '../general/helpers/asyncJSONFetcher';


interface SuspectInfo {
    name: string;
}

export default function Suspect() {

    const [suspectInfo, setSuspectInfo] = useState<SuspectInfo | null>(null);
    const [error, setError] = useState(false);

    const url: string = "https://techswitch-i-spy-api-staging.herokuapp.com/suspect"
    
    useEffect(() => { 
        asyncJSONFetch(url)            
            .then(jsonResponse => setSuspectInfo(jsonResponse))   
            .catch(() => setError(true))          
    }, [url]);    

    // if (error === true) { 
    //     return <div>Oh No!!! There was an error</div> 
    // }

    // if (!suspectInfo){
    //     return (
    //         <div>Fetching data...</div>
    //     )
    // }
    
    return (
        <div>   
            {
                error ? (                    
                    <div>Oh No!!! There was an error</div> 
                ) :

                suspectInfo ? (
                    <div>
                        {suspectInfo.name}
                    </div>
                ) : (
                    <div>
                        Fetching data...
                    </div>
                )
            }  
        </div>
    )
}