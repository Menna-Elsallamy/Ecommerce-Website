import React from 'react'
import { createContext } from "react";
import { useState } from 'react';
export const userContext =createContext();

export default function UserContextProvider(props) {
const [userToken, setUserToken] = useState(null);
return(
<userContext.Provider value={{userToken,setUserToken}}>
    {props.children}
</userContext.Provider>
);
}
