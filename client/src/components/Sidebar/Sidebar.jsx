import { useEffect } from 'react'
import { useSocket } from '../../context/SocketContext'
import './Sidebar.css'

export default function Sidebar() {
    const {users} = useSocket()
    useEffect(() => {
        console.log("users", Object.values(users))
    }, [users])

    return <div className="sidebar-container">
        <div className="users side-container">
            Active Users:
            {
                Object.values(users).map((user, ind) => <div key={ind}>
                    {user}
                </div>)
            }
        </div>
        <div className="settings side-container">
            Settings
            coming soon
            {/* Change background Color */}
            {/* Change User Text Box Color */}
            {/* Change User Name */}
        </div>
    </div>
}