import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { asyncJSONPostFetch } from '../general/helpers/asyncJSONFetcher';
import './LoginPage.scss';

export function LoginPage(){
    const context = useContext(AuthContext);
    
    const [error,setError] = useState<boolean>(false);
    const [username,setUsername] = useState<string>("c@rnati0nZen");
    const [password,setPassword] = useState<string>("c'U(z:NCshz#9c8X");

    async function handleSubmitLogin(event :React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try{
            const jsonResponse = await asyncJSONPostFetch(`${process.env.REACT_APP_API_URL}/login`,formData)
            const token :string = jsonResponse.token;
            
            context.setToken(token);

        } catch (error){
            setError(true)
            context.setToken("");
            console.log('Error',error);
        }
    }
    
    if(context.loggedIn){
        return (<Redirect to ="/admin"/>)
    } 
    
    else if(error){
        setError(false)
        return (
            <section>{alert("Invalid Username and Password Combination")}
                <Redirect to ="/login"/>
            </section>
                
        )
    }

    return (
        <section className="loginPage">
            <h1>Login</h1>
            <form method="post" data-testid="LoginForm" onSubmit={handleSubmitLogin}>
                <label>Username</label>    
                    <input type="text" data-testid="Username" value={username} onChange={event => setUsername(event.target.value)}/>
                
                <label>Password </label>  
                    <input type="password" data-testid="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                
                <input className="submit" type="submit" value="Login" data-testid="SubmitButton"/>
            </form>
        </section>
    )
}

