const url = "172.17.0.1:3000/message"
window.onload = function () {
    joinChat();
    document.addEventListener('keypress', handleKeyPress);
}

const joinChat = () => {
    const name = prompt('Type here');
    localStorage.setItem('chatName', name);
}

// Fetch user data from the API
function fetchUsers() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const chatWindow = document.getElementById('chatWindow');
            chatWindow.innerHTML = '';
            data.forEach(user => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chat-message');
                messageElement.innerHTML = `<span class="username">${user.name}:</span> ${user.message}`;
                chatWindow.appendChild(messageElement);
            });
            chatWindow.scrollTop = chatWindow.scrollHeight;
        })
        .catch(error => console.error(error));
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
}

// Log in the user
function login() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    if (name !== '') {
        const data = { name: name, message: "Enterd chat" };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    // Save the name in local storage
                    localStorage.setItem('chatName', name);

                    // Fetch user data after logging in
                    fetchUsers();
                } else {
                    throw new Error('Error logging in');
                }
            })
            .catch(error => console.error(error));
    }
}

// Send a message
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    const name = localStorage.getItem('chatName');

    if (name !== '' && message !== '') {
        console.log(name);
        console.log(message);
        const data = { name, message };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    // Clear the message input field
                    messageInput.value = '';

                    // Fetch user data after sending the message
                    fetchUsers();
                } else {
                    throw new Error('Error sending message');
                }
            })
            .catch(error => console.error(error));
    }
}

// Check if the user is already logged in
const storedName = localStorage.getItem('chatName');
if (storedName) {
    // Fetch user data if already logged in
    fetchUsers();
}