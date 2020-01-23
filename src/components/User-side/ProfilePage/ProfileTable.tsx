import React from 'react';
import { SuspectProfile } from '../../general/helpers/SuspectProfileInterfaces';
interface SuspectProfileTable {
    profile :SuspectProfile
}

interface TableRowProps {
    heading: string,
    testId: string,
    value?: string,
}

function TableRow(props: TableRowProps) {
    return (
        <tr>
            <th>{props.heading}</th>
            <td data-testid={props.testId}>
                {props.value || `No ${props.heading.toLowerCase()} given`}
            </td>
        </tr>
    );
}

export function ProfileTable(props: SuspectProfileTable) {
    return (
        <div>
            <div className="heading">
            <h1>{props.profile.title}</h1>
            <img src={props.profile.imageUrl} alt=""/>
            </div>
            <div>
                {props.profile.warningMessage !=null ? <h2  className="warning" data-testid="profile-warning">{props.profile.warningMessage}</h2> : null}
            </div>
            <table>
                <tbody>
                    <TableRow heading="Name" value={props.profile.title} testId="profile-name" />
                    <TableRow heading="Date(s) of Birth Used" value={props.profile.dateOfBirth} testId="profile-date-of-birth" />
                    <TableRow heading="Sex" value={props.profile.sex} testId="profile-sex" />
                    <TableRow heading="Race" value={props.profile.race} testId="profile-race" />
                    <TableRow heading="Nationality" value={props.profile.nationality} testId="profile-nationality" />
                    <TableRow heading="Hair" value={props.profile.hair} testId="profile-hair" />
                    <TableRow heading="Eyes" value={props.profile.eyes} testId="profile-eyes" />
                    <TableRow heading="Height" value={props.profile.height} testId="profile-height" />
                    <TableRow heading="weight" value={props.profile.weight} testId="profile-weight" />
                </tbody>
            </table>    
            <table className="cautionTable"> 
                <tbody>
                    {props.profile.details &&
                    <div>
                        <tr>
                        <th className="cautionHeading"><h1 className="details" data-testid="profile-details">DETAILS</h1></th>
                        </tr>
                        <tr>
                        <td className="cautionDescription" data-testid="profile-caution">{props.profile.details}</td>
                        </tr>
                    </div>}
                    
                    {props.profile.caution &&
                    <div>
                        <tr>
                            <th className="cautionHeading"><h1 className="caution">CAUTION</h1></th>
                        </tr>
                        <tr>
                        <td className="cautionDescription">{props.profile.caution}</td>
                        </tr>
                    </div>}
                </tbody>
            </table> 
        </div>
    );
  }