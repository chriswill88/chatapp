import React, { createContext, useContext, useRef, useState } from "react";
import io from "socket.io-client";

const URL = "http://192.168.0.92:3001";
// const URL = "https://7572-2600-8805-d08c-1d00-a01d-4a50-bcff-1ff5.ngrok-free.app";

const sock = io(URL, {
    autoConnect: false
});

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(sock);
    const [users, setUsers] = useState({})

    return (
        <SocketContext.Provider value={{ socket, users, setUsers }} >
            {children}
        </SocketContext.Provider>
    )
}

const useSocket = () => {
    return useContext(SocketContext)
}

export { SocketProvider, useSocket};