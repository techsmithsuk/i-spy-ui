import React from 'react';
import { Person } from './Person';
import renderer from 'react-test-renderer';

describe("Person", () => {
    it("Should render without errors", () => {
        const component = renderer.create(
            <Person/>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});