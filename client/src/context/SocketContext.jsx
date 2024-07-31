import React, { createContext, useContext, useRef, useState } from "react";
import io from "socket.io-client";

const sock = io("http://192.168.0.92:3001", {
    autoConnect: false
});

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(sock);

    return (
        <SocketContext.Provider value={{ socket }} >
            {children}
        </SocketContext.Provider>
    )
}

const useSocket = () => {
    return useContext(SocketContext)
}

export { SocketProvider, useSocket};