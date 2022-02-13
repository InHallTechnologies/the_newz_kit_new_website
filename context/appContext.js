import React, { createContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
    const [location, setLocation] = useState("");
    return(
        <Context.Provider value={[location, setLocation]} >
            {children}
        </Context.Provider>
    )
}
export default Context;