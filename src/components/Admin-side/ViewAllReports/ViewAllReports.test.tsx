import React from "react";
import { render, wait } from "@testing-library/react"
import {mockSuccessfulFetch, mockFailedFetch} from '../../general/helpers/fetchMocks';
import { MemoryRouter as Router } from "react-router-dom";
import { ViewAllReports } from "./ViewAllReports";
import { AuthContextProvider } from "../../AuthContext";

describe('testing api', () => {

    afterEach(() => {
        // @ts-ignore
      global.fetch.resetMocks()
    })

    it("should render Fetching data... while waiting", () => {
        const reportsPage = render(
            <AuthContextProvider initialLoggedIn={true}>
                <ViewAllReports/>
            </AuthContextProvider>);

        expect(reportsPage.getByText("Fetching data...")).toBeInTheDocument();
    })


    it("should render the response when returns correctly", async () => {
            
        let reportList :any[] = new Array();

        reportList.push({	
            "suspectId": 4,
            "date": "22-04-2019",
            "location": "Hong Kong",
            "description": "Skip to my lou"
        });
        reportList.push({
            "suspectId": 5,
            "date": "04-03-2019",
            "location": "Edinburgh",
            "description": "For the lols"
        });

        mockSuccessfulFetch(reportList);

        const reportsPage = render(
            <AuthContextProvider initialLoggedIn={true}>
                <Router>
                    <ViewAllReports/>
                </Router>
            </AuthContextProvider>);

        await wait(() => expect(reportsPage.getByText("SUBMITTED REPORTS")).toBeInTheDocument());
        await wait(() => expect(reportsPage.getByText("Skip to my lou")).toBeInTheDocument());
        await wait(() => expect(reportsPage.getByText("For the lols")).toBeInTheDocument());
        await wait(() => expect(reportsPage.getAllByTestId("ReportCard")).toHaveLength(reportList.length));
    });


    it("should shows an error message if the api call fails", async () => {
        mockFailedFetch();

        const reportsPage = render(
            <AuthContextProvider initialLoggedIn={true}>
                <ViewAllReports/>
            </AuthContextProvider>);

        await wait(() => expect(reportsPage.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    });
});