import React, { useState } from 'react';

export const AuthContext = React.createContext({
    loggedIn: false,
    setLoggedIn: (authState :boolean) => {},
    token: "" ,
    setToken: (token :string) => {}
});

export const AuthContextProvider = (props :any) => {

    const setToken = (newToken :string) => {
      setState({...state, token : newToken});
    }

    const setLoggedIn = ( authState :boolean) => {
      setState({...state, loggedIn : authState});
    }
  
    const initState = {
      token: "",
      setToken: setToken,
      loggedIn: false,
      setLoggedIn: setLoggedIn
    } 
  
    const [state, setState] = useState(initState)
  
    return (
      <AuthContext.Provider value={state}>
        {props.children}
      </AuthContext.Provider>
    )
  }