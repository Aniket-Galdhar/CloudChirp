const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();
const server = http.createServer(app);
const io = socketio(server);

// serve static files (HTML/CSS/JS)
app.use(express.static(path.join(__dirname,'public')));

// socket.io setup
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


// mongo db connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, useUnifiedTopology: true 
}).then(() => {
    console.log('MonogDB connected');
}).catch((err) => {
    console.error('MongoDB connection error',err);
});


// start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});