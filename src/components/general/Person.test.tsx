import React from 'react';
import { Person } from './Person';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';

describe("Person", () => {
    it("Should render without errors", () => {
        const component = renderer.create(
            <Person/>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

test('renders person card', () => {
    const person = document.createElement('Person');
    ReactDOM.render(<Person />, person);
  });