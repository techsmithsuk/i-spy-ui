import React, { useState, useEffect, useContext } from 'react';
import { asyncAdminJSONFetch } from '../../general/helpers/asyncJSONFetcher';
import { Report } from '../../general/helpers/ReportInterface';
import { ReportCard } from '../../general/Report/ReportCard';
import '../ViewAllReports/ViewAllReports.scss';
import { AuthContext } from '../../AuthContext';


export function ViewAllReports(){
    
    const context = useContext(AuthContext)
    const [reportList, setReportList] = useState<Report[] | null>(null);
    const [error, setError] = useState(false);
    let pageNumber :number = 1;
    const urlReport: string = `${process.env.REACT_APP_API_URL}/reports?page=${pageNumber}`
    
    useEffect(() => { 
        asyncAdminJSONFetch(urlReport,context.token)            
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
                    <ReportCard report={report}/></div>)}
            </ol>
        </div>
    )
}

