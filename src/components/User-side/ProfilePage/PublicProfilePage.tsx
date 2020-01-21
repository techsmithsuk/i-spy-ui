import React, { useState, useEffect } from 'react';
import './PublicProfilePage.scss';
import { ProfileTable } from './ProfileTable';
import { ReportSightingButton } from './ReportSightingButton';
import { SuspectProfile, fetchProfileData } from '../../general/helpers/SuspectProfileInterfaces';
import { useParams } from 'react-router-dom';


export function PublicProfilePage() {
    let { id } = useParams();    
    const [suspectProfile, setSuspectProfile] = useState<SuspectProfile | null>(null);
    // const [error, setError] = useState(false);

    useEffect(() => { 
        fetchProfileData(id!!)            
            .then(jsonResponse => setSuspectProfile(jsonResponse))   
            // .catch(() => setError(true))          
    }, [id]); 
    // TODO: Uncomment when using API call
    // if (error) { 
    //     return <div>Oh No!!! There was an error</div> 
    // }

    if (!suspectProfile){
        return (
            <div>Fetching data...</div>
        )
    }

    return (
        <div className="profilePage" data-testid = "ProfilePage">
            <div className="content">
            <h1>{suspectProfile.name}</h1>
            <img src={suspectProfile.imageUrl} alt=""/>
            <ProfileTable profile={suspectProfile}/>
            <ReportSightingButton/>
        </div>
    </div>
    )
}