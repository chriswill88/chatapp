const express = require('express')
const { createServer } = require("http");
const { Server } = require('socket.io');
const cors = require("cors")

const app = express()

app.use(cors);
const server = createServer(app);

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

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }}
)

const userSocketMap = {};

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`)

    socket.on("error", (err) => {
        console.log("Error: ", err)
    });

    socket.on("disconnect", (reason) => {
        console.log(`${userSocketMap[socket.id]} left because of ${reason}`)
        const time = new Date();
        console.log("userSockets", userSocketMap)
        const message = `${userSocketMap[socket.id]} left`;
        delete userSocketMap[socket.id]

        const serverCall = {
            id: "Server",
            message: message,
            time: formatAMPM(time),
            userSocketMap: userSocketMap
        }

        io.sockets.emit("server-call", serverCall);
        }
    )

    socket.on("new_user", async (username) => {
        const time = new Date();
        userSocketMap[socket.id] = username;

        const serverCall = {
            id: "Server",
            message: `${username} joined!`,
            time: formatAMPM(time),
            userSocketMap: userSocketMap
        }
        console.log(`${username} is setup!`)
        console.log("userSockets", userSocketMap)

        io.sockets.emit("server-call", serverCall)
        }
    )
    
    socket.on("send_message", (data) => {
        console.log(`message recieved! message -> ${JSON.stringify(data.message)} id ->${JSON.stringify(data.id)}`)

        const time = new Date();
        const messageSendObj = {
            id: data.id,
            message: data.message,
            time: formatAMPM(time)
        }
        console.log(`message ready! ${messageSendObj}`)

        io.sockets.emit("message_recieved", messageSendObj)
    })
})

server.listen(3001, '0.0.0.0', () => {
    console.log('server running at http://localhost:3001');
}); 