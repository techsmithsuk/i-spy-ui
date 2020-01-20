import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import {mockSuccessfulFetch, mockFailedFetch} from '../general/helpers/fetchMocks';
import { LoginPage } from "./LoginPage";
import { AuthContext, AuthContextProvider } from "../AuthContext";

describe('login page', () => {

    afterEach(() => {
        // @ts-ignore
      global.fetch.resetMocks()
    })

    it("should render Login Page", () => {
        const loginPage = render(<LoginPage/>);
        
        expect(loginPage.getByText("Username")).toBeInTheDocument();
        expect(loginPage.getByText("Password")).toBeInTheDocument();
        expect(loginPage.getByTestId("LoginForm")).toBeInTheDocument();
        expect(loginPage.queryByText("Invalid Username and Password Combination")).toBeNull();
    });

    it("username input fields should update username variable", async () => {
                
        const loginPage = render(<LoginPage/>);

        const inputUsername = loginPage.getByTestId("Username");
        fireEvent.change(inputUsername, { target: { value: 'randomLongUsernameString' } });

        expect(loginPage.getByDisplayValue("randomLongUsernameString")).toBeInTheDocument();

    });

    it("password input fields should update password variable", async () => {
                
        const loginPage = render(<LoginPage/>);

        const inputPassword = loginPage.getByTestId("Password");
        fireEvent.change(inputPassword, { target: { value: 'randomLongPasswordString' } });

        expect(loginPage.getByDisplayValue("randomLongPasswordString")).toBeInTheDocument();
    });

    it("show login page with error message on unsuccessfull login", async () => {
        
        mockFailedFetch();
        
        const loginPage = render(<AuthContextProvider><LoginPage/></AuthContextProvider>);

        const submitButton = loginPage.getByTestId("SubmitButton");
        fireEvent(submitButton, new MouseEvent('click'));

        await wait(() =>expect(loginPage.getByText("Username")).toBeInTheDocument());
        await wait(() =>expect(loginPage.getByText("Password")).toBeInTheDocument());
        await wait(() =>expect(loginPage.getByTestId("LoginForm")).toBeInTheDocument());
        await wait(() => expect(loginPage.getByText("Invalid Username and Password Combination")).toBeInTheDocument());
    });

    it("redirect on successfull login", async () => {
        
        let response :any = ({"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWNoc3dpdGNoLWlzcHkiLCJleHAiOjE1Nzk1MjEyMjd9._Gej08zl3H1bZZkuKB3-0q2q2KE1rEW98R3BHDGebF4"});
        mockSuccessfulFetch(response);
        
        const loginPage = render(<AuthContextProvider><LoginPage/></AuthContextProvider>);

        const submitButton = loginPage.getByTestId("SubmitButton");
        fireEvent(submitButton, new MouseEvent('click'));

        await wait(() => expect(loginPage.queryByTestId("LoginForm")).toBeNull());
    });
});