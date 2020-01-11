import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';

import Suspect from '../suspect/Suspect';

describe("Suspect", () => {
    it("Should render without errors", () => {
        const component = renderer.create(
            <Suspect/>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

test('renders person card', () => {    
    ReactDOM.render(<Suspect />, document.createElement('Suspect'));
  });