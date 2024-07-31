import { useEffect, useMemo, useRef, useState } from 'react';
// import io from 'socket.io-client';
import './Chatroom.css'
import { useSocket } from '../../context/SocketContext';
import { useUser } from '../../context/UserContext';

// const socket = io.connect("http://localhost:3000");

// const fakeData = {
//     user: {
//         id: "chris"
//     }, 
//     messages: [
//         {
//             id: "Server",
//             id: "Server",
//             message: "User Just Joined",
//             status: "sent",
//             time: "1:00 pm"
//         },
//         {
//             id: "me",
//             id: "chris",
//             message: "hey",
//             status: "sent",
//             time: "1:00 pm"
//         },
//         {
//             id: "you",
//             id: "bill",
//             message: "hey",
//             time: "1:01 pm"

//         },
//         {
//             id: "someone",
//             id: "jill",
//             message: "hey",
//             time: "1:03 pm"

//         },
//         {
//             id: "me",
//             id: "chris",
//             message: "lol",
//             time: "1:05 pm"


//         }
//     ]
// }


export default function Chatroom() {
    const {socket} = useSocket()
    const messageRef = useRef();
    const messagesRef = useRef([])
    const [messages, setMessages] = useState([])
    const {userRef} = useUser()


    useEffect(() => {
        socket.on("ready_user", (serverCall) => {
            console.log("RECIEVED FROM SERVER", serverCall)
            messagesRef.current.push(JSON.parse(serverCall))
            console.log("current message ref", messagesRef.current)
            setMessages([])
        })

        socket.on("message_recieved", (messageObj) => {
            console.log("Recieved from Server ->", messageObj)
            messagesRef.current.push(JSON.parse(messageObj))
            console.log("current message ref", messagesRef.current)
            setMessages([])
        })

        return () => {
            socket.off("ready_user");
            socket.off("message_recieved");
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

    const Messaging = (() => {
        console.log("messaging runs again...")
        {/* post a message */}
        return messages.map((mess, ind)=> {
            if (mess.id == 'Server') {
                return <div key={ind}>
                    <span>{mess.message}</span>
                </div>
            }
            else {
                return <div key={ind} className={`message-container ${(mess.id == userRef.current.userName) ? 'my-message-block' : 'your-message-block'}`}>
                    <span className='name'>{mess.id}</span>
                    <div className={`message ${mess.id == userRef.current.userName ? 'me' : 'anyone'}`}>
                        <span className='text'>{mess.message}</span>
                    </div>
                    <span className="time">{mess.time}</span>
                </div>
            }
        })
    })

    return <div className="chatroom-container" >
        {/* top bar */}
        <div className="topbar">
            <p className='title'>Daily Chat</p>
            
            <div className="info">
                <div>Live</div>
                <div className='live-box'></div>
            </div>
        </div>

        {/* display screen for posts */}
        <div id="message-box" className="messages-container">
            <Messaging />
        </div>

        {/* post a comment */}
        <form className="textbox-container" onSubmit={handleSubmit}>
            <textarea id="output" rows={1} onChange={handleTextChange} className="textbox" placeholder='Write your message...' name="comment"/>
            <button type="submit">send</button>
        </form>
    </div>
}