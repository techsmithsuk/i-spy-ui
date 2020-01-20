import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { asyncJSONPostFetch } from '../general/helpers/asyncJSONFetcher';

export function LoginPage(){
    const context = useContext(AuthContext);
    const [fetchSuccess,setFetchSuccess] = useState<boolean>();
    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    async function handleSubmitLogin(event :React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try{
            const jsonResponse = await asyncJSONPostFetch(`${process.env.REACT_APP_API_URL}/login`,formData)
            const token :string = jsonResponse.token;

            context.setToken(token);
            setFetchSuccess(true);
            
        
        } catch (error){
            setFetchSuccess(false)
            console.log('Error',error);
        }
    }
    
    if(fetchSuccess === true){
        return (<Redirect to ="/"/>)
    } 
    
    else if(fetchSuccess === false){
        return (
            <div>
                <Login></Login>
                <h3>Invalid Username and Password Combination</h3>
            </div>
        )
    }

    console.log("rendering it the first time.")
    return (
        <Login/>
    )

    function Login(){
        return (
            <section>
                <h1>Login</h1>
                <form method = "post" data-testid="LoginForm" onSubmit = {handleSubmitLogin}>

                    <label>
                        Username
                        <input type = "text" data-testid="Username" value = {username} onChange = {event => setUsername(event.target.value)}/>
                    </label>

                    <label>
                        Password
                        <input type = "text" data-testid="Password" value = {password} onChange = {event => setPassword(event.target.value)}/>
                    </label>

                    <input type = "submit" value = "Login" data-testid="SubmitButton"/>

                </form>
            </section>
        )
    }
}

