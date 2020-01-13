import React from "react";
import { render, wait } from "@testing-library/react"
import Suspect from './Suspect';


function mockSuccessfulFetch(responseBody) {
    const response = Promise.resolve({
        json: () => Promise.resolve(responseBody)
    })
    jest.spyOn(global, 'fetch').mockImplementation(() => response);
}

function mockFailedFetch() {
    const response = Promise.reject();
    jest.spyOn(global, 'fetch').mockImplementation(() => response);
}

describe('testing api', () => {

    afterEach(() => {
      global.fetch.resetMocks()
    })

    it("should render the response when returns correctly", async () => {
        mockSuccessfulFetch({name: "alan"});

        const suspect = render(<Suspect/>);
        expect(suspect.getByText("Fetching data...")).toBeInTheDocument();
        await wait(() => expect(suspect.getByText("alan")).toBeInTheDocument());
    });

    it("should shows an error message if the api call fails", async () => {
        mockFailedFetch();

        const suspect = render(<Suspect/>);
        expect(suspect.getByText("Fetching data...")).toBeInTheDocument();
        await wait(() => expect(suspect.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    });
});