import React from "react";
import { render, wait, fireEvent } from "@testing-library/react"
import { mockSuccessfulFetch, mockFailedFetch } from '../../general/helpers/fetchMocks';
import { PublicHomepage } from "./PublicHomepage";
import { MemoryRouter as Router } from "react-router-dom";
import { AuthContextProvider} from "../../AuthContext";

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
    
        const homepage = render(<Router><PublicHomepage/></Router>);
        await wait(() => expect(homepage.getByText("Harry Potter")).toBeInTheDocument());
        await wait(() => expect(homepage.getByText("James Cameron")).toBeInTheDocument());
        await wait(() => expect(homepage.getAllByTestId("SuspectCard")).toHaveLength(suspectList.length));
    });


    it("should shows an error message if the api call fails", async () => {
        mockFailedFetch();

        const homepage = render(<PublicHomepage/>);
        await wait(() => expect(homepage.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    });

    it("should show Update List and Add New Profile buttons when logged in", async () => {
              
        let suspectList :any[] = new Array();

        suspectList.push({"id":1,"name":"Harry Potter","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});
        suspectList.push({"id":1,"name":"James Cameron","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

        mockSuccessfulFetch(suspectList);

        const homepage = render(
        <AuthContextProvider initialLoggedIn={true}>
            <Router>
                <PublicHomepage/>
            </Router>
        </AuthContextProvider>);

        await wait(() => expect(homepage.getByText("Harry Potter")).toBeInTheDocument());
        await wait(() => expect(homepage.getByText("James Cameron")).toBeInTheDocument());
        await wait(() => expect(homepage.getAllByTestId("SuspectCard")).toHaveLength(suspectList.length));
        await wait(() => expect(homepage.getByText("UPDATE LIST")).toBeInTheDocument());
        await wait(() => expect(homepage.getByText("ADD NEW PROFILE")).toBeInTheDocument());
    });

    it("should show Update List when logged in and Update List button is clicked", async () => {
              
        let suspectList :any[] = new Array();

        suspectList.push({"id":1,"name":"Harry Potter","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});
        suspectList.push({"id":1,"name":"James Cameron","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

        let successfulUpdate :any =({"Success":"No data has been added. Database Up to date."})

        mockSuccessfulFetch(suspectList);
        mockSuccessfulAdminFetch(successfulUpdate);

        const homepage = render(
        <AuthContextProvider initialLoggedIn={true}>
            <Router>
                <PublicHomepage/>
            </Router>
        </AuthContextProvider>);

        fireEvent.click(homepage.getByText("UPDATE LIST"))

        await wait(() => expect(homepage.getByText("Harry Potter")).toBeInTheDocument());
        await wait(() => expect(homepage.getByText("James Cameron")).toBeInTheDocument());
        await wait(() => expect(homepage.getAllByTestId("SuspectCard")).toHaveLength(suspectList.length));
        await wait(() => expect(homepage.getByText("UPDATE LIST")).toBeInTheDocument());
        await wait(() => expect(homepage.getByText("ADD NEW PROFILE")).toBeInTheDocument());
    });
});