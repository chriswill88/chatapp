import Chatroom from './components/Chatroom/Chatroom'
import { UserProvider } from './context/UserContext';
import { SocketProvider } from './context/SocketContext';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css'


function App() {
  return (
    <SocketProvider>
      <UserProvider>
        <div className='app-container'>
          {/* chatroom */}
          <Chatroom />
          {/* Sidebar */}
          <Sidebar />
        </div>
      </UserProvider>
    </SocketProvider>
  )
}

export default App
