import React, { useState, useEffect } from 'react';
import { asyncJSONFetch } from '../../general/helpers/asyncJSONFetcher';
import { Report } from '../../general/helpers/ReportInterface';
import { ReportCard } from '../../general/Report/ReportCard';
import '../ViewAllReports/ViewAllReports.scss';


export function ViewAllReports(){
    
    const [reportList, setReportList] = useState<Report[] | null>(null);
    const [error, setError] = useState(false);
    let pageNumber :number = 1;
    const urlReport: string = `${process.env.REACT_APP_API_URL}/reports?page=${pageNumber}`
    
    useEffect(() => { 
        asyncJSONFetch(urlReport)            
            .then(jsonResponse => setReportList(jsonResponse))  
            .catch(() => setError(true))          
    }, [urlReport]);   

    if (error) { 
        return <div>Oh No!!! There was an error</div> 
    }

    if (!reportList){
        return (
            <div>Fetching data...</div>
        )
    }

    return (
        <div className="viewAllReports">

            <h1>SUBMITTED REPORTS</h1>

            <ol className="reportList"> 
                {reportList.map(report => <div className ="reportIndiv" data-testid = "ReportCard">
                    <ReportCard dateOf = {report.dateOfSighting} place = {report.location} description={report.description} timeSubmitted={report.timestampSubmitted} suspectId={report.suspectId} /></div>)}
            </ol>
        </div>
    )
}

