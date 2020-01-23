import React, { useState, useEffect, useContext } from 'react';
import './PublicProfilePage.scss';
import { ProfileTable } from './ProfileTable';
import { SuspectProfile, fetchProfileData } from '../../general/helpers/SuspectProfileInterfaces';
import { useParams } from 'react-router-dom';
import { CreateReportPage } from './CreateReport';


export function PublicProfilePage() {
    let { id } = useParams();    
    const [suspectProfile, setSuspectProfile] = useState<SuspectProfile | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => { 
        fetchProfileData(id!!)            
            .then(jsonResponse => setSuspectProfile(jsonResponse))   
            .catch(() => setError(true))          
    }, [id]); 

    if (error) { 
        return <div>Oh No!!! There was an error</div> 
    }    

    if (!suspectProfile){
        return (
            <div>Fetching data...</div>
        )
    }

    return (
        <main className="profilePage" data-testid = "ProfilePage">
            <div className="content">
                <ProfileTable profile={suspectProfile}/>
                <CreateReportPage/>
            </div>
        </main>
    )
}