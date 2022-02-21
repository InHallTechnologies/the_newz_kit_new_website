import React, { createContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
    const [sessionId, setSessionId] = useState("");;
    return(
        <Context.Provider value={[sessionId, setSessionId]} >
            {children}
        </Context.Provider>
    )
}
export default Context;