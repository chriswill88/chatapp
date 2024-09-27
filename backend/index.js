const express = require('express')
const { createServer } = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

const app = express()

app.use(cors);
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }}
)

function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}



var userSocketMap = {};
var rooms = [];
var currentRoom = {roomName: 'main-room', roomId: null};
// const prefix = 'ROOM--';

function setRoomsState() {

    rooms = Array.from(io.sockets.adapter.rooms).filter(room => 
        {
            if (Object.keys(userSocketMap).includes(room[0])) {
                return {
                    "roomName": room[0],
                    "roomId": room[1].keys().next().value
                }
            }
        }
    )
    
    console.log("rooms are ->", rooms, Object.keys(userSocketMap))
    currentRoom = rooms?.filter(room => room?.roomName == currentRoom?.roomName)
}

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on("new_user", async (username) => {
        userSocketMap[socket.id] = username;
        const time = new Date();
        
        console.log(currentRoom.roomName)
        socket.join(currentRoom.roomName)
        setRoomsState()

        console.log("rooms ->", rooms)
        console.log("user socket map ->", userSocketMap)
        
        const serverCall = {
            id: "Server",
            message: `${username} joined!`,
            time: formatAMPM(time),
            userSocketMap: userSocketMap,
            rooms: rooms
        }
        console.log(`${username} is setup!\nrooms: ${JSON.stringify(io.sockets.adapter.rooms)} ${JSON.stringify(userSocketMap)}`)
        io.to(currentRoom).emit("server-call", serverCall)
    })

    socket.on("error", (err) => {
        // console.log("Error: ", err)
    });

    socket.on("change_name", (userName) => {
        userSocketMap[socket.id] = userName;
        // console.log("user socket map ->", userSocketMap)    
    });

    socket.on("disconnect", (reason) => {
        // console.log(`${userSocketMap[socket.id]} left because of ${reason}`)
        const time = new Date();
        const message = `${userSocketMap[socket.id]} left`;
        delete userSocketMap[socket.id]

        
        const serverCall = {
            id: "Server",
            message: message,
            time: formatAMPM(time),
            userSocketMap: userSocketMap,
            rooms: rooms
        }
        io.to(currentRoom).emit("server-call", serverCall);
        // io.sockets.emit("server-call", serverCall);
    })

    socket.on('create&join', function (room, callback) {
        socket.join(room);

        console.log("New Room Created! ->", room, Array.from(io.sockets.adapter.rooms))
        
        setRoomsState()
        console.log("rooms ->", rooms)

        io.to(currentRoom).emit("new-room", rooms)
        // io.sockets.emit("new-room", rooms)

        // callback({
        //     status: "ok",
        //     rooms: rooms
        // })
    });
    
    socket.on("send_message", (data) => {
        const time = new Date();
        const messageSendObj = {
            id: data.id,
            message: data.message,
            time: formatAMPM(time)
        }
        // console.log(`message ready! ${JSON.stringify(messageSendObj)}`)
        io.to(currentRoom).emit("message_recieved", messageSendObj)
        // io.sockets.emit("message_recieved", messageSendObj)
    })
})

server.listen(3001, '0.0.0.0', () => {
    // console.log('server running at http://localhost:3001');
}); 