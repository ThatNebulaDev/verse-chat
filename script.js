// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxPVDqTSoEPFfnPMCp9ICTLmmTIL8yClY",
  authDomain: "verse-chat-app.firebaseapp.com",
  projectId: "verse-chat-app",
  storageBucket: "verse-chat-app.appspot.com",
  messagingSenderId: "456307821262",
  appId: "1:456307821262:web:94b3eafeece4cc0bbd1e9f",
  measurementId: "G-4NTDHZQ0T2"
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
