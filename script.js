// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const joinButton = document.getElementById("join-button");
const usernameInput = document.getElementById("username-input");

let username = "";

// Function to load messages
function loadMessages() {
    const messagesRef = database.ref("messages");
    messagesRef.on("child_added", (snapshot) => {
        const messageData = snapshot.val();
        displayMessage(messageData.username, messageData.text);
    });
}

// Display message in the chat box
function displayMessage(username, message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = `${username}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Join chat
joinButton.addEventListener("click", () => {
    const name = usernameInput.value.trim();
    if (name) {
        username = name;
        document.getElementById("username-form").style.display = "none";
        messageInput.disabled = false;
        sendButton.disabled = false;
        loadMessages();
    } else {
        alert("Please enter a username.");
    }
});

// Send message
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        const messagesRef = database.ref("messages");
        messagesRef.push({ username, text: message });
        messageInput.value = "";
    }
});

// Load messages on page load
loadMessages();
