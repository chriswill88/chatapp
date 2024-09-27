import { useRef, useState } from "react"
import { useUser } from "../../context/UserContext"
import { useSocket } from "../../context/SocketContext";


export default function Login() {
    const {socket} = useSocket();
    const userNameRef = useRef()
    const {userRef, login, setLogin} = useUser()


    const loginCall = (e) => {
        // prevent browser from reloading the page
        e.preventDefault()

        if (!userNameRef.current) userNameRef.current = "Anon"
        userRef.current.userName = userNameRef.current
        socket.connect();

        socket.emit("new_user", `${userRef.current.userName}`)
        setLogin(true)
    }

    const handleTextChange = (e) => {
        userNameRef.current = e.target.value;
        console.log(userNameRef.current)
    }

    return !login && <div className="login-container">
        <form onSubmit={loginCall}>
            <p>Welcome to simple chat!</p>
            <p>Write a cool user name to chat :)</p>
            <input onChange={handleTextChange} placeholder="User Name" name="userName" />
            <button className="submit-button" type="submit">login</button>
        </form>
    </div>
}