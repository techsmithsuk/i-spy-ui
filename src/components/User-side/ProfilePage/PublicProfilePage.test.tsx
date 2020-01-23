import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route, Router } from "react-router-dom";
import { PublicProfilePage } from './PublicProfilePage';
import { render, wait, fireEvent } from '@testing-library/react';
import { mockFailedFetch } from '../../general/helpers/fetchMocks';
import { createBrowserHistory } from "history";
import { ProfileTable } from './ProfileTable';

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

describe('testing api', () => {

    it("should render Fetching data... while waiting", () => {
        const profilePage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <Route path="/profile/:id" component={PublicProfilePage}/>
            </MemoryRouter>
        );
        expect(profilePage.getByText("Fetching data...")).toBeInTheDocument();
    })

    it("should render the response when returns correctly", async () => {
        const profilePage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <Route path="/profile/:id" component={PublicProfilePage}/>
            </MemoryRouter>
        );
        await wait(() => expect(profilePage.getByText("Male")).toBeInTheDocument);
    })

    it("should shows an error message if the api call fails", async () => {
        mockFailedFetch();
        const history = createBrowserHistory();

        const profilePage = render(<Router history={history}><PublicProfilePage/></Router>);
        await wait(() => expect(profilePage.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    });

    afterEach(() => {
        // @ts-ignore
      global.fetch.resetMocks()
    })

    it("should render Create Report Page", () => {
        const loginPage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <PublicProfilePage/>
            </MemoryRouter>
        );
        
        expect(loginPage.getByText("Date of sighting")).toBeInTheDocument();
        expect(loginPage.getByText("Location")).toBeInTheDocument();
        expect(loginPage.getByText("Additional details")).toBeInTheDocument();
        expect(loginPage.getByTestId("CreateReportForm")).toBeInTheDocument();
    });

    it("Date of sighting input fields should update Date of sighting variable", async () => {
                
        const createReportPage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <PublicProfilePage/>
            </MemoryRouter>
        );

        const inputDate = createReportPage.getByTestId("Date");
        fireEvent.change(inputDate, { target: { value: '01/02/2019' } });

        expect(createReportPage.getByDisplayValue("01/02/2019")).toBeInTheDocument();

    });

    it("Location input fields should update Location variable", async () => {
                
        const createReportPage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <PublicProfilePage/>
            </MemoryRouter>
            );

        const inputLocation = createReportPage.getByTestId("Location");
        fireEvent.change(inputLocation, { target: { value: 'London' } });

        expect(createReportPage.getByDisplayValue("London")).toBeInTheDocument();

    });

    it("Description input fields should update Description variable", async () => {
                
        const createReportPage = render(
            <MemoryRouter initialEntries={["/profile/1"]}>
                <PublicProfilePage/>
            </MemoryRouter>
        );

        const inputDescription = createReportPage.getByTestId("Description");
        fireEvent.change(inputDescription, { target: { value: 'randomLongDescriptionString' } });

        expect(createReportPage.getByDisplayValue("randomLongDescriptionString")).toBeInTheDocument();

    });

    it("Fully populated criminal profile", async () => {


        const profile = render(
            <MemoryRouter initialEntries={["/profile/2"]}>
                <PublicProfilePage />
            </MemoryRouter>
        
        );
        
        await wait(() => expect(profile.getByTestId("profile-warning")).toBeInTheDocument());
        await wait(() => expect(profile.getByText("SHOULD BE CONSIDERED ARMED AND DANGEROUS")).toBeInTheDocument());


    });

});
