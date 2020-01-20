import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { asyncJSONPostFetch } from '../general/helpers/asyncJSONFetcher';

export function LoginPage(){
    const context = useContext(AuthContext);
    const [error,setError] = useState<boolean>(false);
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
            context.setLoggedIn(true);
            
        } catch (error){
            setError(true)
            context.setLoggedIn(false);
            console.log('Error',error);
        }
    }
    
    if(context.loggedIn){
        return (<Redirect to ="/"/>)
    } 
    
    else if(error){
        return (
            <div>
                <Login></Login>
                <h3>Invalid Username and Password Combination</h3>
            </div>
        )
    }

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

