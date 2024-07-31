import { useUser } from "../../context/UserContext"
import './Messages.css'

export default function Messages({messages}) {
    const {userRef} = useUser()

    {/* post a message */}
    return messages.map((mess, ind)=> {
        if (mess.id == 'Server') {
            return <div key={ind}>
                <span className="server-message">{mess.message}</span>
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
}