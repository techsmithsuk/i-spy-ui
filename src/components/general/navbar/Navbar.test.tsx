import React from 'react';
import { Navbar } from './Navbar';
import renderer from 'react-test-renderer';
import { BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';

describe("Navbar", () => {
    it("Should render without errors", () => {
        const component = renderer.create(
            <BrowserRouter>
            <Navbar/>
            </BrowserRouter>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
