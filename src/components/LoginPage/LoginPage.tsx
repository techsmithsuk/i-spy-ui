import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export function LoginPage(){
    const state = useContext(AuthContext);
    const [fetchSuccess,setFetchSuccess] = useState<boolean>();
    const [username,setUsername] = useState<string>("c@rnati0nZen");
    const [password,setPassword] = useState<string>("c'U(z:NCshz#9c8X");

    async function handleSubmitLogin(event :React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password',password);

        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`,{
                method:'POST',
                body: formData
            });
            const jsonResponse :any= await response.json();
            const token :string = jsonResponse.token;

            setFetchSuccess(true);
            state.setToken(token);
        
        } catch (error){

            setFetchSuccess(false)
            console.log('Error',error);
        }
    }
    
    if(fetchSuccess === true){
        return (<Redirect to ="/"></Redirect>)
    } 
    
    else if(fetchSuccess === false){
        return (
            <div>
                <Login></Login>
                <h3>Oh No!!! There was an error</h3>
            </div>
        )
    }

    return (
        <Login></Login>
    )

    function Login(){
        return (
            <div>
                <h1>Login</h1>
                <h1>{state.token}</h1>
                <form method = "post" onSubmit = {handleSubmitLogin}>
    
                    <input type = "text" value = {username} onChange = {event => setUsername(event.target.value)}/>
                    <input type = "text" value = {password} onChange = {event => setPassword(event.target.value)}/>
                    <input type = "submit" value = "Login"/>
    
                </form>
    
            </div>
        )
    }
}

