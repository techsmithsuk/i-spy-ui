import React, { useState, ReactNode } from 'react';

export interface AuthInterface {
  token: string,
  setToken: (token: string) => void,
  loggedIn: boolean
}

export const AuthContext = React.createContext<AuthInterface>({
  token: "",
  setToken: (token: string) => {},
  loggedIn: false
});

interface AuthContextProviderProps {
  initialToken?: string,
  initialLoggedIn?: boolean,
  children: ReactNode,
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {

    const setToken = (newToken :string) => {
      setState({...state, token : newToken, loggedIn : newToken === "" ? false : true});
    }
  
    const initState = {
      token: props.initialToken || "",
      setToken: setToken,
      loggedIn: props.initialLoggedIn || false
    } 
  
    const [state, setState] = useState(initState)
  
    return (
      <AuthContext.Provider value={state}>
        {props.children}
      </AuthContext.Provider>
    )
  }