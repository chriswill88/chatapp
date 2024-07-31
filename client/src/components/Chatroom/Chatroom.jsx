import { useEffect, useMemo, useRef, useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useUser } from '../../context/UserContext';
import './Chatroom.css'
import Messages from '../Message/Messages';
import Login from '../Login/Login';


export default function Chatroom() {
    const {socket, setUsers} = useSocket()
    const messageRef = useRef();
    const messagesRef = useRef([])
    const [messages, setMessages] = useState([])
    const {userRef, login} = useUser()

    useEffect(() => {
        socket.on("server-call", (serverCall) => {
            console.log("RECIEVED FROM SERVER", serverCall)
            messagesRef.current.push(serverCall)
            setUsers(serverCall.userSocketMap)
            console.log("current message ref", messagesRef.current)
            setMessages([])
        })

        socket.on("message_recieved", (messageObj) => {
            console.log("Recieved from Server ->", messageObj)
            messagesRef.current.push(messageObj)
            console.log("current message ref", messagesRef.current)
            setMessages([])
        })

        return () => {
            socket.off("message_recieved");
            socket.off("server-call");
        }
    }, [socket])

    useEffect(() => {
        const element = document.getElementById("message-box")
        element.scrollTop = element.scrollHeight;
        setMessages(messagesRef.current)
    }, [messages])

    const handleSubmit = (e) => {
        // prevent browser from reloading the page
        e.preventDefault()

        document.getElementById("output").value = "";
        if (!messageRef.current) {
            return true;
        }

        socket.emit("send_message", {
            message: messageRef.current,
            id: userRef.current.userName
        }, )

        messageRef.current = null
    }

    const handleTextChange = (e) => {
        messageRef.current = e.target.value;
    }

    return <div className="chatroom-container" >
        {/* top bar */}
        <div className="topbar">
            <p className='title'>Daily Chat</p>
            
            <div className="info">
                <div>Live</div>
                <div className={`${login ? 'live-box' : 'nonlive-box'}`}></div>
            </div>
        </div>

        {/* login */}
        <Login/>

        {/* display screen for posts */}
        <div id="message-box" className="messages-container">
            <Messages messages={messages}/>
        </div>

        {/* post a comment */}
        {login && <form className="textbox-container" onSubmit={handleSubmit}>
            <textarea id="output" rows={1} onChange={handleTextChange} className="textbox" placeholder='Write your message...' name="comment"/>
            <button className="send-button" type="submit">send</button>
        </form>}
    </div>
}