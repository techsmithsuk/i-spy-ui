import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`,{
                method:'POST',
                body: formData
            });
            const jsonResponse :any= await response.json();
            const token :string = jsonResponse.token;

            setFetchSuccess(true);
            context.setToken(token);
        
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
                <h3>Invalid Username and Password Combination</h3>
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
                <form method = "post" data-testid = "LoginForm" onSubmit = {handleSubmitLogin}>

                    <label>
                        Username
                        <input type = "text" name = "username" value = {username} onChange = {event => setUsername(event.target.value)}/>
                    </label>

                    <label>
                        Password
                        <input type = "text" name = "password" value = {password} onChange = {event => setPassword(event.target.value)}/>
                    </label>

                        <input type = "submit" value = "Login"/>

                </form>
    
            </div>
        )
    }
}

