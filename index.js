const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const socketio = require('socket.io');

dotenv.config();
const server = http.createServer(app);
const io = socketio(server);

// basic route
app.get('/', (req,res) => {
    res.send('Server is running');
});

io.on('connection',(socket) => {
    console.log('User connected:', socket.id);

    socket.on('chat message', (msg) => {
        console.log('Message:', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is is running on port ${PORT}`);
});