import React from "react";
import { render,wait } from "@testing-library/react"
import {mockSuccessfulFetch, mockFailedFetch} from '../general/helpers/fetchMocks';
import { LoginPage } from "./LoginPage";
import { Simulate } from "react-dom/test-utils";

describe('testing api', () => {

    afterEach(() => {
        // @ts-ignore
      global.fetch.resetMocks()
    })

    it("should render Login Page", () => {
        const loginpage = render(<LoginPage/>);
        expect(loginpage.getByText("Username")).toBeInTheDocument();
        expect(loginpage.getByText("Password")).toBeInTheDocument();
        expect(loginpage.getByTestId("LoginForm")).toBeInTheDocument();
    })


    // it("should render the response when returns correctly", async () => {
            

    //     let response :any = ({"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWNoc3dpdGNoLWlzcHkiLCJleHAiOjE1Nzk1MjEyMjd9._Gej08zl3H1bZZkuKB3-0q2q2KE1rEW98R3BHDGebF4"});

    //     mockSuccessfulFetch(response);
    //     const loginpage = mount(<LoginPage/>);
    //     Simulate.submit
    //     expect(onsubmit;
    //     await wait(() => expect(loginpage.getBy("Harry Potter")).toBeInTheDocument);
    // });


    // it("should shows an error message if the api call fails", async () => {
    //     mockFailedFetch();

    //     const homepage = render(<PublicHomepage/>);
    //     await wait(() => expect(homepage.getByText("Oh No!!! There was an error")).toBeInTheDocument());
    // });
});