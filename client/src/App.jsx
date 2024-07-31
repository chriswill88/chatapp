import Chatroom from './components/Chatroom/Chatroom'
import Login from './components/Login/Login'
import { UserProvider } from './context/UserContext';
import './App.css'
import { SocketProvider } from './context/SocketContext';



function App() {
  return (
    <SocketProvider>
      <UserProvider>
        {/* login */}
        <Login />
        {/* chatroom */}
        <Chatroom />
      </UserProvider>
    </SocketProvider>
  )
}

export default App
