import React from "react";
import { render, fireEvent, wait } from "@testing-library/react"
import { mockSuccessfulFetch } from "./general/helpers/fetchMocks";
import { LoginPage } from "./LoginPage/LoginPage";

describe('testing api', () => {

    afterEach(() => {
        // @ts-ignore
      global.fetch.resetMocks()
    })
    
    it("test default AuthContext function", async () => {
        
        let response :any = ({"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWNoc3dpdGNoLWlzcHkiLCJleHAiOjE1Nzk1MjEyMjd9._Gej08zl3H1bZZkuKB3-0q2q2KE1rEW98R3BHDGebF4"});
        mockSuccessfulFetch(response);
        
        const loginPage = render(<LoginPage/>);

        const submitButton = loginPage.getByTestId("SubmitButton");
        fireEvent(submitButton, new MouseEvent('click'));

        await wait(() => expect(loginPage.queryByTestId("LoginForm")).toBeInTheDocument());
    });
});