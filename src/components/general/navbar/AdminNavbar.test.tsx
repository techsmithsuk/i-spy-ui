import React from 'react';
import { AdminNavbar } from './AdminNavbar';
import renderer from 'react-test-renderer';
import { BrowserRouter} from "react-router-dom";

describe("Navbar", () => {
    it("Should render without errors", () => {
        const component = renderer.create(
            <BrowserRouter>
            <AdminNavbar/>
            </BrowserRouter>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
