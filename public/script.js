const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Submit new message
form.addEventListener('submit',(e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value='';
    }
});

// Append live messages
socket.on('chat message', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
});


// Load chat history
socket.on('chat history', (history) => {
    history.forEach((msg) => {
        const li = document.createElement('li');
        li.textContent=msg.text;
        messages.appendChild(li);
    });
    window.scrollTo(0,document.body.scrollHeight);
});