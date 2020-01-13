import React from "react";
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { act, render } from "@testing-library/react"
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Suspect from './Suspect';
import asyncJSONFetch from '../general/helpers/asyncJSONFetcher';

// test('renders suspect', () => {
//     const container = document.createElement('Container');
//     ReactDOM.render(<Suspect />, container);
// });

// it("renders Fetching Data... Whilst Waiting", async () => {   
//     await act(async () => {
//         const { getByText } = render(<Suspect/>)
//         getByText("Fetching data...")
//     })
// })

// https://stackoverflow.com/questions/44741102/how-to-make-jest-wait-for-all-asynchronous-code-to-finish-execution-before-expec
// const flushPromises = () => new Promise(setImmediate);

describe("Suspect", () => {
    it("Should render without errors", async () => {
        const component = renderer.create(<Suspect/>);
        // await flushPromises();
        // component.update();
        // const asJson = component.toJSON();
        // expect.objectContaining({
        //     name: expect.any(String)
        // })
    });
});