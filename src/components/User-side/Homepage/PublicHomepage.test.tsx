import React from "react";
import { render, wait, fireEvent } from "@testing-library/react"
import { mockSuccessfulFetch, mockFailedFetch, mockPageChangeSuccessfulFetch } from '../../general/helpers/fetchMocks';
import { HomePage, AdminHomePage } from './PublicHomepage'
import { MemoryRouter as Router } from "react-router-dom";
import { AuthContextProvider} from "../../AuthContext";

describe('testing api', () => {

    afterEach(() => {
        // @ts-ignore
      global.fetch.resetMocks()
    })

    it("should render Fetching data... while waiting", () => {
        const homepage = render(<HomePage/>);
        expect(homepage.getByText("Fetching data...")).toBeInTheDocument();
    })


    it("should render the response when returns correctly", async () => {
            
        let suspectList :any[] = new Array();
        
        suspectList.push({"id":1,"title":"Harry Potter","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});
        suspectList.push({"id":2,"title":"James Cameron","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

        let jsonResponse :any = ({"items":suspectList,
                                    "totalNumberOfItems": 808,
                                    "previousPage": null,
                                    "nextPage": "/suspects?page=2&pageSize=10"})
        mockSuccessfulFetch(jsonResponse);
    
        const homepage = render(<Router><HomePage/></Router>);
        await wait(() => expect(homepage.getByText("Harry Potter")).toBeInTheDocument());
        await wait(() => expect(homepage.getByText("James Cameron")).toBeInTheDocument());
        await wait(() => expect(homepage.getAllByTestId("SuspectCard")).toHaveLength(suspectList.length));
    });

    it("should render previous page button when possible", async () => {
            
        let suspectList :any[] = new Array();
        
        suspectList.push({"id":1,"title":"Harry Potter","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

        let jsonResponse :any = ({"items":suspectList,
                                    "totalNumberOfItems": 808,
                                    "previousPage": null,
                                    "nextPage": "/suspects?page=2&pageSize=10"})
        mockSuccessfulFetch(jsonResponse);
    
        const homepage = render(<Router><HomePage/></Router>);
        await wait(() => expect(homepage.getByText("PREVIOUS")).toHaveClass("buttonInvisible"));
        await wait(() => expect(homepage.getByText("NEXT")).toHaveClass("indivPageButton"));
    });

    it("should render next page button when possible", async () => {
            
        let suspectList :any[] = new Array();
        
        suspectList.push({"id":1,"title":"Harry Potter","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

        let jsonResponse :any = ({"items":suspectList,
                                    "totalNumberOfItems": 808,
                                    "previousPage": "/suspects?page=2&pageSize=10",
                                    "nextPage": null})
        mockSuccessfulFetch(jsonResponse);
    
        const homepage = render(<Router><HomePage/></Router>);
        await wait(() => expect(homepage.getByText("NEXT")).toHaveClass("buttonInvisible"));
        await wait(() => expect(homepage.getByText("PREVIOUS")).toHaveClass("indivPageButton"));
    });

    it("should change page onClick", async () => {
            
        mockPageChangeSuccessfulFetch();

        const homepage = render(<Router><HomePage/></Router>);

        await wait(() =>fireEvent.click(homepage.getByText("NEXT")));
    
        await wait(() => expect(homepage.getByText("James Cameron")).toBeInTheDocument());
        await wait(() => expect(homepage.queryByText("Harry Potter")).toBeNull());

        await wait(() =>fireEvent.click(homepage.getByText("PREVIOUS")));

        await wait(() => expect(homepage.getByText("Harry Potter")).toBeInTheDocument());
        await wait(() => expect(homepage.queryByText("James Cameron")).toBeNull());
    });


    it("should shows an error message if the api call fails", async () => {
        mockFailedFetch();

        const homepage = render(<HomePage/>);
        await wait(() => expect(homepage.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    });

    it("should show Update List and Add New Profile buttons when logged in", async () => {
              
        let suspectList :any[] = new Array();
        
        suspectList.push({"id":1,"title":"Harry Potter","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});
        suspectList.push({"id":2,"title":"James Cameron","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

        let jsonResponse :any = ({"items":suspectList,
                                    "totalNumberOfItems": 808,
                                    "previousPage": null,
                                    "nextPage": "/suspects?page=2&pageSize=10"})
        mockSuccessfulFetch(jsonResponse);

        const homepage = render(
        <AuthContextProvider initialLoggedIn={true}>
            <Router>
                <AdminHomePage/>
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

        suspectList.push({"id":1,"title":"Harry Potter","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});
        suspectList.push({"id":1,"title":"James Cameron","imageUrl":"https://www.fbi.gov/wanted/additional/cesar-munguia/@@images/image/thumb"});

        let jsonResponse :any = ({"items":suspectList,
                                    "totalNumberOfItems": 808,
                                    "previousPage": null,
                                    "nextPage": "/suspects?page=2&pageSize=10"})
        mockSuccessfulFetch(jsonResponse);

        const homepage = render(
        <AuthContextProvider initialLoggedIn={true}>
            <Router>
                <AdminHomePage/>
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