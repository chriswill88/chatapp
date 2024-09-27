import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../../context/SocketContext'
import ColorPicker from 'react-best-gradient-color-picker'
import { useUser } from '../../context/UserContext'

export default function Sidebar() {
    const {users, socket} = useSocket()
    const [open, setOpen] = useState()
    const [textBoxColor, setTextBoxColor] = useState()
    const [backgroundColor, setBackgroundColor] = useState()
    const userNameRef = useRef();
    const {userRef} = useUser()
    

    useEffect(() => {
        console.log("users", Object.values(users))
    }, [users])

    const changeUserName = (e) => {
        // prevent browser ffrom reloading the page
        e.preventDefault()

        userRef.current.userName = userNameRef.current
        socket.emit("change_name", `${userRef.current.userName}`)
    }

    const handleTextChange = (e) => {
        userNameRef.current = e.target.value;
        console.log(userNameRef.current)
    }

    return <div className="sidebar-container">
        <div className="container users side-container">
            <div className="topbar">
                <p className="title">{Object.values(users).length} Active User(s)</p>
            </div>
            <div className='users-containers'>
            {
                Object.values(users).map((user, ind) => <div key={ind}>
                    {/* <div className="indicator"></div> */}
                    <p>{user}</p>
                </div>)
            }
            </div>
        </div>
        <div className="container settings side-container">
            <div className="topbar">
                <p className="title">Settings</p>
            </div>
            {/* Change User Name */}
            <div>
                <p onClick={()=>{
                    if (open == 1) {
                        setOpen(null);
                    } else {
                        setOpen(1)
                    }
                }}>Change User Name</p>
                {(open == 1) && <form className="change-name-container" onSubmit={changeUserName}>
                    <input onChange={handleTextChange} placeholder="User Name" name="userName" />
                    <button className="submit-button">Change User Name</button>
                </form>}
            </div>

            {/* Change background Color */}
            {/* <div>
                <p onClick={()=>{}}>Change Background Color</p>
                <div className='background color-container'>
                    <ColorPicker value={backgroundColor} hideOpacity={true} onChange={setBackgroundColor} width={180} height={100} hideControls={true} hideColorTypeBtns={true} hideInputs={true} hidePresets={true}/>
                    <button className="submit-button" onClick={null}>Change Background Color</button>
                </div>
            </div> */}

            {/* Change User Text Box Color */}
            {/* <div onClick={()=>{}} className='textBox color-container'>
                <p>Change Text Box Color</p>
                <ColorPicker value={textBoxColor} hideOpacity={true} onChange={setTextBoxColor} width={180} height={100} hideControls={true} hideColorTypeBtns={true} hideInputs={true} hidePresets={true}/>
                <button className="submit-button" onClick={null}>Change Textbox Color</button>
            </div> */}
        </div>
    </div>
}