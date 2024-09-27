import { useEffect, useMemo, useRef } from 'react'
import { useSocket } from '../../context/SocketContext'

export default function RoomPicker() {
    const {socket, rooms, setRooms} = useSocket()
    const roomNameRef = useRef()


    // const RoomComp = useMemo(() => {
    //     console.log("update rooms state!")
    //     return <>
    //         {
    //             rooms.map((room, id) => <p key={id}>{room.roomName} {room.roomId}</p>)
    //         }
    //     </>
    // }, [rooms])

    const createRoom = (e) => {
        e.preventDefault()
        if (!roomNameRef.current) {
            alert("Add room name dweeb!")
        } else {
            socket.emit("create&join", roomNameRef.current, (response) => {
                console.log("Status response", response.status, response.rooms)
                setRooms([])
                
                response.rooms.map((room) => console.log("room log", room))
            })
        }
    }

    const handleTextChange = (e) => {
        roomNameRef.current = e.target.value;
        console.log(roomNameRef.current)
    }

    return <div className='container picker-container'>
        <div className="topbar">
            <p className='title'>Create Rooms</p>
        </div>
        <div>
            <form className='create-box' onSubmit={createRoom}>
                <input onChange={handleTextChange} placeholder='room name'/>
                <button className='room-button' type="submit">create room</button>
            </form>
        </div>


        <div>
            <p>Active Rooms</p>
            {
                rooms.length ? rooms.map((room, id) => <div key={id}><p>{room.roomName}</p> <p>{room.roomId}</p></div>) :
                <p>No Active Rooms</p>
            }            
        </div>
    </div>
}