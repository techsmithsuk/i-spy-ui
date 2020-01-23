import React from 'react';
import { PublicNavbar } from './PublicNavbar';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from "react-router-dom";
import { render, fireEvent, wait } from "@testing-library/react"
import { AuthContextProvider } from '../../AuthContext';

describe("Navbar", () => {
    it("Should render without errors", () => {
        const component = renderer.create(
            <Router>
                <PublicNavbar/>
            </Router>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

it("should render all options for logged in users", () => {
    const component = render(
        <AuthContextProvider initialLoggedIn={true}>
            <Router>
                <PublicNavbar/>
            </Router>
        </AuthContextProvider>
    )
    expect(component.getByText("Reports")).toBeInTheDocument();
    // expect(component.getByText("Manage Users")).toBeInTheDocument();
    // expect(component.getByText("Admin Settings")).toBeInTheDocument();
});

it("should show no other options when logged out", async () => {
    const component = render(
        <AuthContextProvider initialLoggedIn={true}>
            <Router>
                <PublicNavbar/>
            </Router>
        </AuthContextProvider>
    )
    
    const logOutButton = component.getByText("Log Out");
    fireEvent.click(logOutButton);

    await wait(() => expect(component.queryByText("Reports")).toBeNull());
    await wait(() => expect(component.queryByText("Manage Users")).toBeNull());
    await wait(() => expect(component.queryByText("Admin Settings")).toBeNull());
    await wait(() => expect(component.queryByText("Home")).toBeInTheDocument());
});
