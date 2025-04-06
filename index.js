const express = require('express');
const app = express();
const dotenv = require('dotenv');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const Message = require('./models/message');

dotenv.config();
const server = http.createServer(app);
const io = socketio(server);

// serve static files (HTML/CSS/JS)
app.use(express.static(path.join(__dirname,'public')));

// socket.io setup
io.on('connection', async(socket) => {
    console.log('User connected:', socket.id);
    
    // show recent chat histroy
    try{
        const messages = await Message.find().sort({ timestamp: 1 }).limit(50);
        socket.emit('chat history', messages);
    } catch(err){
        console.error('Error fetching messages: ', err);
    }

    // chat message socket handler
    socket.on('chat message', async (msg) => {
        console.log('Message:', msg);

        const newMessage = new Message({
            text: msg,
            senderId: socket.id
        });

        try{
            await newMessage.save();
            io.emit('chat message', msg);
        } catch(err){
            console.error('Error saving message:', err);
        }
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