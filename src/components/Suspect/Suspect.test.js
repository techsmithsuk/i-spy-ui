import React from "react";
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { act, render, waitForDomChange } from "@testing-library/react"
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import Suspect from './Suspect';
import asyncJSONFetch from '../general/helpers/asyncJSONFetcher';
import fetch from 'jest-fetch-mock';

// Tests Nothing Found
test('Shows Fetching data... when rendering Suspect', () => {
    const component = renderer.create(<Suspect/>)    
    expect(component).toContain(<div>Fetching data...</div>);
});

// Tests Error State



// Tests Returns Useful Data
// test('Shows Useful data... after rendering Suspect', async () => {

//     fetch.mockResponse(JSON.stringify({name: 'Allen'}));
    
//     const component = renderer.create(<Suspect/>);

//     expect(component).toBe(<div>Allen</div>);   
    
// });