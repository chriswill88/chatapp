import Chatroom from './components/Chatroom/Chatroom'
import { UserProvider, useUser } from './context/UserContext';
import { SocketProvider, useSocket } from './context/SocketContext';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css'
import RoomPicker from './components/RoomPicker/RoomPicker';
import Login from './components/Login/Login';
import LeftPanel from './components/LeftPanel/LeftPanel';
import Profile from './components/profile/Profile';
import ChatArea from './components/ChatArea';
import { useEffect, useRef, useState } from 'react';


function App() {
  const {socket, setUsers, setRooms} = useSocket()
  const messageRef = useRef();
  const messagesRef = useRef([])
  const [messages, setMessages] = useState([])
  const {userRef, login} = useUser()

  useEffect(() => {
    socket.on("server-call", (serverCall) => {
        console.log("RECIEVED FROM SERVER", serverCall)
        messagesRef.current.push(serverCall)
        setUsers(serverCall.userSocketMap)
        setRooms(serverCall.rooms)
        console.log("current message ref", messagesRef.current)
        setMessages([])
    })

    socket.on("message_recieved", (messageObj) => {
        console.log("Recieved from Server ->", messageObj)
        messagesRef.current.push(messageObj)
        console.log("current message ref", messagesRef.current)
        setMessages([])
    })

    socket.on("new-room", (rooms) => {
        setRooms(rooms)
    })

    return () => {
        socket.off("message_recieved");
        socket.off("server-call");
        socket.off("new-room");
    }
  }, [socket])

  return (
    <div className='app-container'>
      {/* login */}
      <Login/>
      {/* left hub */}
      <LeftPanel>
        <Profile />
      </LeftPanel>
      <ChatArea />
      {/* <RoomPicker /> */}
      {/* chatroom */}
      {/* <Chatroom /> */}
      {/* Sidebar */}
      {/* <Sidebar /> */}
    </div>

  )
}

export default App
