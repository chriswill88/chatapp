import React, { createContext, useContext, useRef, useState } from "react";


const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const userRef = useRef({
        id: null,
        userName: null
    })


    return (
        <UserContext.Provider value={{user, setUser, userRef}} >
            {children}
        </UserContext.Provider>
    )
}

const useUser = () => {
    return useContext(UserContext)
}

export { UserProvider, useUser};