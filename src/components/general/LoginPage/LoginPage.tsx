import React, { useState } from 'react';

export function LoginPage(){
    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");

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
            const token = await response.json();
        } catch (error){
            console.log('Error',error);
        }
    }

    return (
        <div>
            Login
            <form method = "post" onSubmit = {handleSubmitLogin}>

                <input type = "text" value = {username} onChange = {event => setUsername(event.target.value)}/>
                <input type = "text" value = {password} onChange = {event => setPassword(event.target.value)}/>
                <input type = "submit" value = "Login"/>

            </form>

        </div>
    )

}