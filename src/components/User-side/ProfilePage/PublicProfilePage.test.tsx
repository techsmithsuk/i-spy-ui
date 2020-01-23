import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route, Router } from "react-router-dom";
import { PublicProfilePage } from './PublicProfilePage';
import { render, wait, fireEvent } from '@testing-library/react';
import { mockFailedFetch, mockSuccessfulFetch } from '../../general/helpers/fetchMocks';
import { createBrowserHistory } from "history";
import { ProfileTable } from './ProfileTable';
import { SuspectProfile } from '../../general/helpers/SuspectProfileInterfaces';
import { CreateReportPage } from './CreateReport';

describe("ProfilePage", () => {
    it("Should render a Reporting A Sighting button that matches snapshot", () => {
        const component = renderer.create(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <PublicProfilePage/>
            </MemoryRouter>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });
});

describe('Suspect Profile Page', () => {

    afterEach(() => {
        // @ts-ignore
      global.fetch.resetMocks()
    })

    it("should render Fetching data... while waiting", () => {
        const profilePage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <Route path="/profile/:id" component={PublicProfilePage}/>
            </MemoryRouter>
        );
        expect(profilePage.getByText("Fetching data...")).toBeInTheDocument();
    })

    // it("should render the response when returns correctly", async () => {
    //     const profilePage = render(
    //         <MemoryRouter initialEntries={["/profile/1"]}>
    //             <Route path="/profile/:id" component={PublicProfilePage}/>
    //         </MemoryRouter>
    //     );
    //     await wait(() => expect(profilePage.getByText("Male")).toBeInTheDocument);
    // })

    it("should shows an error message if the api call fails", async () => {
        mockFailedFetch();
        const history = createBrowserHistory();

        const profilePage = render(<Router history={history}><PublicProfilePage/></Router>);
        await wait(() => expect(profilePage.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    });

    it("Date of sighting input fields should update Date of sighting variable", async () => {
                
        const createReportPage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <CreateReportPage/>
            </MemoryRouter>
        );

        const inputDate = createReportPage.getByTestId("Date");
        fireEvent.change(inputDate, { target: { value: '01/02/2019' } });

        expect(createReportPage.getByDisplayValue("01/02/2019")).toBeInTheDocument();

    });

    it("Location input fields should update Location variable", async () => {
                
        const createReportPage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <CreateReportPage/>
            </MemoryRouter>
            );

        const inputLocation = createReportPage.getByTestId("Location");
        fireEvent.change(inputLocation, { target: { value: 'London' } });

        expect(createReportPage.getByDisplayValue("London")).toBeInTheDocument();

    });

    it("Description input fields should update Description variable", async () => {
                
        const createReportPage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <CreateReportPage/>
            </MemoryRouter>
        );

        const inputDescription = createReportPage.getByTestId("Description");
        fireEvent.change(inputDescription, { target: { value: 'randomLongDescriptionString' } });

        expect(createReportPage.getByDisplayValue("randomLongDescriptionString")).toBeInTheDocument();

    });



    it("should render a missing person's profile", async () => {
            
        let jsonResponse :SuspectProfile = ({
            "id":6,
            "title":"MAJD KAMALMAZ",
            "dateOfBirth":"January 6, 1958",
            "sex":"Male",
            "race":"No race given",
            "nationality":"Syrian and American",
            "hair":"gray",
            "eyes":"brown",
            "height":"68",
            "weight":"No weight given",
            "details":"Majd Kamalmaz is a psychologist who was treating refugees in the region from war-torn Syria.  In February of 2017, he traveled to Syria to visit an elderly family member in Damascus.  During this trip, he was also looking to establish a clinic to aid those who have been traumatized by the Syrian civil war.  A day after arriving, Kamalmaz was stopped at a Syrian Government checkpoint in Mezzeh, a suburb of Damascus, and has not been seen or heard from since that day. "
        })
        mockSuccessfulFetch(jsonResponse);

        const profile = render(<MemoryRouter initialEntries={["/profile/6"]}><PublicProfilePage/></MemoryRouter>);
        await wait(() => expect(profile.getByText("January 6, 1958")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("Male")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("No race given")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("Syrian and American")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("gray")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("brown")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("68")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("No weight given")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("Majd Kamalmaz is a psychologist who was treating refugees in the region from war-torn Syria.  In February of 2017, he traveled to Syria to visit an elderly family member in Damascus.  During this trip, he was also looking to establish a clinic to aid those who have been traumatized by the Syrian civil war.  A day after arriving, Kamalmaz was stopped at a Syrian Government checkpoint in Mezzeh, a suburb of Damascus, and has not been seen or heard from since that day.")).toBeInTheDocument);

    });

    it("should render a suspect's profile", async () => {
            
        let jsonResponse :SuspectProfile = ({
            "id":2,
            "warningMessage":"SHOULD BE CONSIDERED ARMED AND DANGEROUS",
            "title":"JUVON JULIAN SEARLES",
            "dateOfBirth":"October 9, 1980",
            "sex":"Male",
            "race":"black",
            "nationality":"American",
            "hair":"black",
            "eyes":"brown",
            "height":"69",
            "weight":"260 to 280 pounds",
            "caution":"The FBI's Washington Field Office is assisting the Metropolitan Police Department (MPD) in Washington, D.C. and the US Marshals Service Capital Area Task Force with their search for Juvon Julian Searles.  On Tuesday, July 24, 2018, at approximately 8:16 p.m., the MPD responded to a report of gunshots at the 800 Block of R Street, Northwest, Washington, D.C., where they located a male victim suffering from multiple gunshot wounds. The victim was transported to an area hospital for treatment of life-threatening injuries and was pronounced dead shortly thereafter.  On December 4, 2018, Searles was charged in the Superior Court of the District of Columbia with Second Degree Murder While Armed and a warrant was issued for his arrest. "
        })
        mockSuccessfulFetch(jsonResponse);

        const profile = render(<MemoryRouter initialEntries={["/profile/6"]}><PublicProfilePage/></MemoryRouter>);
        await wait(() => expect(profile.getByText("October 9, 1980")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("Male")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("American")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("black")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("brown")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("69")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("No weight given")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("The FBI's Washington Field Office is assisting the Metropolitan Police Department (MPD) in Washington, D.C. and the US Marshals Service Capital Area Task Force with their search for Juvon Julian Searles.  On Tuesday, July 24, 2018, at approximately 8:16 p.m., the MPD responded to a report of gunshots at the 800 Block of R Street, Northwest, Washington, D.C., where they located a male victim suffering from multiple gunshot wounds. The victim was transported to an area hospital for treatment of life-threatening injuries and was pronounced dead shortly thereafter.  On December 4, 2018, Searles was charged in the Superior Court of the District of Columbia with Second Degree Murder While Armed and a warrant was issued for his arrest. ")).toBeInTheDocument);
        // await wait(() => expect(profile.getByText("SHOULD BE CONSIDERED ARMED AND DANGEROUS")).toBeInTheDocument);

    });

    it("renders error message on unsuccessful submit", async () => {
            const profilePage = render(
                <MemoryRouter initialEntries={["/profile/1"]}>
                    <Route path="/profile/:id" component={CreateReportPage}/>
                </MemoryRouter>
            );
            fireEvent.click(profilePage.getByText("Submit Report"))
            mockFailedFetch();
            await wait(() => expect(profilePage.getByText("Something went wrong")).toBeInTheDocument());
        })

        it("renders message on successful submit", async () => {
            const profilePage = render(
                <MemoryRouter initialEntries={["/profile/1"]}>
                    <Route path="/profile/:id" component={CreateReportPage}/>
                </MemoryRouter>
            );
            let response :any = ({"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWNoc3dpdGNoLWlzcHkiLCJleHAiOjE1Nzk1MjEyMjd9._Gej08zl3H1bZZkuKB3-0q2q2KE1rEW98R3BHDGebF4"});
            mockSuccessfulFetch(response);

            fireEvent.click(profilePage.getByText("Submit Report"))
            await wait(() => expect(profilePage.getByText("Thank you for submitting your report")).toBeInTheDocument());
        })

});
