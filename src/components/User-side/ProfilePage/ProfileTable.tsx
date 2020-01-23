import React, { useState, useEffect } from 'react';
import { SuspectProfile } from '../../general/helpers/SuspectProfileInterfaces';
interface SuspectProfileTable {
    profile :SuspectProfile
}

export function ProfileTable(props: SuspectProfileTable) {
    return (
        <div>
            <div>
                {props.profile.warningMessage !=null ? <h2  className="warning" data-testid="profile-warning">{props.profile.warningMessage}</h2> : null}
            </div>
        <table>
        <tr>
            <th>Name</th>
            <td data-testid="profile-name">{props.profile.title !=null ? props.profile.title : 'No title given'}</td>
        </tr>
        <tr>
            <th>Date(s) of Birth Used</th>
            <td data-testid="profile-date-of-birth">{props.profile.dateOfBirth !=null ? props.profile.dateOfBirth: 'No date of dirth given'}</td>
        </tr>
        <tr>
            <th>Sex</th>
            <td data-testid="profile-sex">{props.profile.sex !=null ? props.profile.sex : 'No sex given'}</td>
        </tr>
        <tr>
            <th>Race</th>
            <td data-testid="profile-race">{props.profile.race !=null ? props.profile.race : 'No race given'}</td>
        </tr>
        <tr>
            <th>Nationality</th>
            <td data-testid="profile-nationality">{props.profile.nationality !=null ? props.profile.nationality : 'No nationality given'}</td>
        </tr>
        <tr>
            <th>Hair</th>
            <td data-testid="profile-hair">{props.profile.hair !=null ? props.profile.hair : 'No hair colour given'}</td>
        </tr>
        <tr>
            <th>Eyes</th>
            <td data-testid="profile-eyes">{props.profile.eyes !=null ? props.profile.eyes : 'No eye colour given'}</td>
        </tr>
        <tr>
            <th>Height</th>
            <td data-testid="profile-height">{props.profile.height !=null ? props.profile.height : 'No height given'}</td>
        </tr>
        <tr>
            <th>Weight</th>
            <td data-testid="profile-weight">{props.profile.weight !=null ? props.profile.weight : 'No weight given'}</td>
        </tr>
    </table>    
    <table className="cautionTable"> 
        <div>
            {props.profile.details !=null ? 
            <div>
                <tr>
                <th className="cautionHeading"><h1 className="details" data-testid="profile-details">DETAILS</h1></th>
                </tr>
                <tr>
                <td className="cautionDescription" data-testid="profile-caution">{props.profile.details}</td>
                </tr>
            </div>
            : null}
        </div>
        <div>
            {props.profile.caution !=null ?
            <div>
                <tr>
                    <th className="cautionHeading"><h1 className="caution">CAUTION</h1></th>
                </tr>
                <tr>
                <td className="cautionDescription">{props.profile.caution}</td>
                </tr>
            </div>
            : null}
        </div>
    </table> 
    </div>
    );
  }