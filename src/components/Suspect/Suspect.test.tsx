import React from "react";
import { render, wait } from "@testing-library/react"
import Suspect from './Suspect';
import {mockSuccessfulFetch, mockFetchError} from '../general/helpers/fetchMocks';

describe('testing api', () => {

    afterEach(() => {
        // @ts-ignore
      global.fetch.resetMocks()
    })

    it("should render Fetching data... while waiting", () => {
        const suspect = render(<Suspect/>);
        expect(suspect.getByText("Fetching data...")).toBeInTheDocument();
    })


    it("should render the response when returns correctly", async () => {
        mockSuccessfulFetch({name: "alan"});
        
        const suspect = render(<Suspect/>);
        await wait(() => expect(suspect.getByText("alan")).toBeInTheDocument());
    });

    it("should shows an error message if the api call fails", async () => {
        mockFetchError();

        const suspect = render(<Suspect/>);
        await wait(() => expect(suspect.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    });
});