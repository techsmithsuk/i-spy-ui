import React from "react";
import { render, wait } from "@testing-library/react"
import {mockSuccessfulFetch, mockFailedFetch} from '../../general/helpers/fetchMocks';
import { PublicHomepage } from "./PublicHomepage";
import { createBrowserHistory } from 'history';
import { Router } from "react-router-dom";

describe('testing api', () => {

    afterEach(() => {
        // @ts-ignore
      global.fetch.resetMocks()
    })

    it("should render Fetching data... while waiting", () => {
        const homepage = render(<PublicHomepage/>);
        expect(homepage.getByText("Fetching data...")).toBeInTheDocument();
    })


    it("should render the response when returns correctly", async () => {
            
        let suspectList :any[] = new Array();

        suspectList.push({"id":1,"name":"Harry Potter","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});
        suspectList.push({"id":1,"name":"James Cameron","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

        mockSuccessfulFetch(suspectList);
        const history = createBrowserHistory();
        const homepage = render(<Router history={history}><PublicHomepage/></Router>);
        await wait(() => expect(homepage.getByText("Harry Potter")).toBeInTheDocument);
        await wait(() => expect(homepage.getByText("James Cameron")).toBeInTheDocument);
        await wait(() => expect(homepage.getAllByTestId("SuspectCard")).toHaveLength(suspectList.length));
    });


    it("should shows an error message if the api call fails", async () => {
        mockFailedFetch();

        const homepage = render(<PublicHomepage/>);
        await wait(() => expect(homepage.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    });
});