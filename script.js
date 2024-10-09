const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Load messages from local storage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach((msg) => {
        displayMessage(msg);
    });
}

// Display message in the chat box
function displayMessage(msg) {
    const messageElement = document.createElement("div");
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Send message
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        displayMessage(message);
        saveMessage(message);
        messageInput.value = "";
    }
});

// Save message to local storage
function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
}

// Load messages on page load
loadMessages();
