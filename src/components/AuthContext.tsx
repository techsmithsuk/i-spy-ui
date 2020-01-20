import React, { useState } from 'react';

export const AuthContext = React.createContext({
    token: "" ,
    setToken: (token :string) => {}
});

export const AuthContextProvider = (props :any) => {

    const setToken = (newToken :string) => {
      setState({...state, token: newToken})
    }
  
    const initState = {
      token: "",
      setToken: setToken
    } 
  
    const [state, setState] = useState(initState)
  
    return (
      <AuthContext.Provider value={state}>
        {props.children}
      </AuthContext.Provider>
    )
  }