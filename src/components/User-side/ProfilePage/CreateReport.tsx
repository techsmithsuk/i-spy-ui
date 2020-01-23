import React, { useState, useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { asyncJSONPostFetch } from '../../general/helpers/asyncJSONFetcher'


export function CreateReportPage(){
    let { id } = useParams(); 
    const [error,setError] = useState<boolean>(false);
    const [reportSent, setReportSent] = useState<boolean>(false);
    const [date,setDate] = useState<string>("");
    const [location,setLocation] = useState<string>("");
    const [additionalInfo,setAdditionalInfo] = useState<string>("");

    async function handleSubmitReport (event :React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('suspectId', id!!);
        formData.append('date', date);
        formData.append('location', location);
        formData.append('description', additionalInfo);

        try{
            await asyncJSONPostFetch(`http://localhost:8080/reports/create`, formData)
            // alert ("Sighting successfully reported")
            setReportSent(true);
            setError(false);
        } catch (error){
            setError(true)
        }
      }

    if (error) {
        return <div>Something went wrong</div>
    }

    if (reportSent) {
        return <div className="reportSent">Thank you for submitting your report</div>
    }

    return (
        <section>
            <h1 className="reportASighting"> REPORT A SIGHTING </h1>
            <form method = "post" data-testid="CreateReportForm" onSubmit = {handleSubmitReport}>
                
                <h2>Date of sighting</h2>
                <label>
                    <input type = "text"  value = {date} placeholder="dd-mm-yyyy" pattern="\d{1,2}-\d{1,2}-\d{4}" onChange = {event => setDate(event.target.value)} data-testid="Date" required/>
                </label>

                <h2>Location</h2>
                <label>
                    <input type = "text"  value = {location} onChange = {event => setLocation(event.target.value)} data-testid="Location" required/>
                </label>

                <h2>Additional details </h2>
                <label>
                    <textarea value = {additionalInfo} onChange = {event => setAdditionalInfo(event.target.value)} data-testid="Description"/>
                </label>

                <input className="submit" type = "submit" value = "Submit Report"/>

            </form>
        </section>
    )
}

