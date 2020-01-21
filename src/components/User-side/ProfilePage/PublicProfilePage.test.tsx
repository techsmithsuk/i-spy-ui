import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route } from "react-router-dom";
import { PublicProfilePage } from './PublicProfilePage';

import { render, wait } from '@testing-library/react';

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

    // it("should shows an error message if the api call fails", async () => {
    //     mockFailedFetch();
    //     const history = createBrowserHistory();

    //     const profilePage = render(<Router history={history}><PublicProfilePage/></Router>);
    //     await wait(() => expect(profilePage.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    // });

});
