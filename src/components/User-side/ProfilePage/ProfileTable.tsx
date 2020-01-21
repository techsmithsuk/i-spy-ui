import React, { useState, useEffect } from 'react';
import { SuspectProfile } from '../../general/helpers/SuspectProfileInterfaces';

interface SuspectProfileTable {
    profile :SuspectProfile
}

export function ProfileTable(props: SuspectProfileTable) {
    return (
        <table>
        <tr>
            <th>Name</th>
            <td>{props.profile.name}</td>
        </tr>
        <tr>
            <th>Date(s) of Birth Used</th>
            <td>{props.profile.dates_of_birth_used}</td>
        </tr>
        <tr>
            <th>Place of Birth</th>
            <td>{props.profile.place_of_birth}</td>
        </tr>
        <tr>
            <th>Sex</th>
            <td>{props.profile.sex}</td>
        </tr>
        <tr>
            <th>Race</th>
            <td>{props.profile.race}</td>
        </tr>
        <tr>
            <th>Nationality</th>
            <td>{props.profile.nationality}</td>
        </tr>
        <tr>
            <th>Hair</th>
            <td>{props.profile.hair}</td>
        </tr>
        <tr>
            <th>Eyes</th>
            <td>{props.profile.eyes}</td>
        </tr>
        <tr>
            <th>Height</th>
            <td>{props.profile.height}</td>
        </tr>
        <tr>
            <th>Weight</th>
            <td>{props.profile.weight}</td>
        </tr>
    </table> 
    );
  }