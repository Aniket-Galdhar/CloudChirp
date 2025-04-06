const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Prompt for nickname
let nickname = localStorage.getItem('nickname');
if (!nickname){
    nickname = prompt("enter you nickname:");
    localStorage.setItem('nickname', nickname);
}

// Submit new message
form.addEventListener('submit',(e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', {
            text: input.value,
            username:nickname,
            timestamp: Date.now()
        });
        input.value='';
    }
});

// Append live messages
socket.on('chat message', (msg) => {
    const li = document.createElement('li');
    const time = new Date(msg.timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    li.textContent = `[${time}] ${msg.username}: ${msg.text}`;
    messages.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
});


// Load chat history
socket.on('chat history', (history) => {
    history.forEach((msg) => {
        const li = document.createElement('li');
        const time = new Date(msg.timestamp).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
        li.textContent = `[${time}] ${msg.username}: ${msg.text}`;
        messages.appendChild(li);
    });
    window.scrollTo(0,document.body.scrollHeight);
});