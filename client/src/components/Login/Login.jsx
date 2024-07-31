import { useRef, useState } from "react"
import { useUser } from "../../context/UserContext"
import { useSocket } from "../../context/SocketContext";
import './Login.css'


export default function Login() {
    const {socket} = useSocket();

    const [login, setLogin] = useState(false);
    const userNameRef = useRef()
    const {userRef} = useUser()


    const loginCall = (e) => {
        // prevent browser from reloading the page
        e.preventDefault()

        if (!userNameRef.current) userNameRef.current = "Anony"
        userRef.current.userName = userNameRef.current
        socket.connect();

        socket.emit("new_user", `${userRef.current.userName}`)
        setLogin(true)
    }

    const handleTextChange = (e) => {
        userNameRef.current = e.target.value;
        console.log(userNameRef.current)
    }

    return !login && <form className="login-container" onSubmit={loginCall}>
        <input onChange={handleTextChange} placeholder="User Name" name="userName" />
        <button type="submit">login</button>
    </form>
}