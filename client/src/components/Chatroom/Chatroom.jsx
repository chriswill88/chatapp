import { useEffect, useMemo, useRef, useState } from 'react';
import './Chatroom.css'


const fakeData = {
    user: {
        id: "me",
        userName: "chris"
    }, 
    messages: [
        {
            id: "me",
            userName: "chris",
            message: "hey",
            status: "sent",
            time: "1:00 pm"
        },
        {
            id: "you",
            userName: "bill",
            message: "hey",
            time: "1:01 pm"

        },
        {
            id: "someone",
            userName: "jill",
            message: "hey",
            time: "1:03 pm"

        },
        {
            id: "me",
            userName: "chris",
            message: "lol",
            time: "1:05 pm"


        }
    ]
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


export default function Chatroom() {
    const messageRef = useRef();
    const [messages, setMessages] = useState(fakeData.messages)

    useEffect(() => {
        const element = document.getElementById("message-box")
        element.scrollTop = element.scrollHeight;
        setMessages(fakeData.messages)
    }, [messages])

    const handleSubmit = (e) => {
        // prevent browser from reloading the page
        e.preventDefault()
        document.getElementById("output").value = "";
        if (!messageRef.current) {
            return true;
        }
        const time = new Date();
        const messageSendObj = {
            id: fakeData.user.id,
            userName: fakeData.user.userName,
            message: messageRef.current,
            time: formatAMPM(time)
        }
        fakeData.messages.push(messageSendObj)
        setMessages([])
        messageRef.current = null
    }

    const handleTextChange = (e) => {
        messageRef.current = e.target.value;
    }

    const Messaging = (() => {
        console.log("messaging runs again...")
        {/* post a message */}
        return messages.map((message, ind)=> {
            if (message.id == fakeData.user.id) {
                return <div className='message-container my-message-block'>
                    <span className='name'>{message.userName}</span>
                    <div key={ind} className="message me">
                        <span className='text'>{message.message}</span>
                    </div>
                    <span className="time">{message.time}</span>
                </div>
            } else {
                return <div className='message-container your-message-block'>
                    <span className='name'>{message.userName}</span>
                    <div key={ind} className="message anyone">
                        <span className='text'>{message.message}</span>
                    </div>
                    <span className="time">{message.time}</span>
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