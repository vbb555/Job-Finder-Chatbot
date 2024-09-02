// Wit.ai API Configuration
const WIT_API_TOKEN = 'Z35365ZIJZFHZEAMNX3GXGS6VUQPRD3A'; // Replace with your Wit.ai token
const WIT_API_URL = 'https://api.wit.ai/message?v=20210925&q=';

// Function to call Wit.ai API and get the intent
async function getIntentFromWitAi(userInput) {
    const response = await fetch(WIT_API_URL + encodeURIComponent(userInput), {
        headers: {
            'Authorization': `Bearer ${WIT_API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data;
}

// Modified handleUserInput function to use Wit.ai
async function handleUserInput(inputText = null) {
    const userInput = inputText || document.getElementById("userInput").value.trim();
    if (userInput !== "") {
        addMessage(userInput, "user-message");
        document.getElementById("userInput").value = "";

        // Show typing indicator
        showTypingIndicator();

        // Get intent from Wit.ai
        const witResponse = await getIntentFromWitAi(userInput);
        removeTypingIndicator();
        console.log(witResponse+"--");
        // Handle response based on detected intent
        let botResponse = "";
        const detectedIntent = witResponse.intents.length > 0 ? witResponse.intents[0].name : null;
        console.log(detectedIntent+"==");
        switch(detectedIntent) {
            case 'Job_search':
                botResponse = "Great! What type of job are you looking for? (e.g., software developer, data analyst)";
                conversationStage = 2;
                break;
            case 'greeting':
                botResponse = "Hello! How can I assist you today?";
                conversationStage = 0;
                break;
            case 'profile':
                botResponse = "Fetching your profile information...";
                // Implement profile fetching logic here
                break;
            case 'settings':
                botResponse = "Here are your settings options...";
                // Implement settings options here
                break;
            case 'help':
                botResponse = "How can I help you? You can ask me about job listings, your profile, or settings.";
                break;
            default:
                botResponse = "Sorry, I didn't understand that. Could you please rephrase?";
                conversationStage = 0; // Reset to the beginning of the conversation
        }

        addMessage(botResponse, "bot-message");
    }
}

// Other existing functions like addMessage, showTypingIndicator, removeTypingIndicator, etc., remain unchanged

// Event Listeners for Send Button and Enter Key
document.getElementById("sendBtn").addEventListener("click", function() {
    handleUserInput();
});

document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        handleUserInput();
    }
});

// Dark Mode Toggle Event Listener
document.getElementById("darkModeToggle").addEventListener("change", function() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
});

// Side Panel Option Selection
function selectOption(option) {
    let botResponse = "";
    switch(option) {
        case 'findJob':
            botResponse = "Sure! What type of job are you looking for?";
            conversationStage = 2;
            break;
        case 'profile':
            botResponse = "Here's your profile information...";
            // Implement profile fetching logic here
            break;
        case 'settings':
            botResponse = "Here are your settings options...";
            // Implement settings options here
            break;
        case 'help':
            botResponse = "How can I help you? You can ask me about job listings, your profile, or settings.";
            break;
        default:
            botResponse = "I'm not sure how to help with that.";
    }
    addMessage(botResponse, "bot-message");
}
// Adjusted typing indicator delay


// Function to Add Messages to Chatbox
function addMessage(message, className) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;

    if (className === "bot-message") {
        const avatarDiv = document.createElement("div");
        avatarDiv.className = "avatar";
        avatarDiv.innerHTML = '<img src="bot-avatar.png" alt="Bot Avatar">';
        messageDiv.appendChild(avatarDiv);
    }

    const textDiv = document.createElement("div");
    textDiv.className = "text";
    textDiv.textContent = message;
    messageDiv.appendChild(textDiv);

    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Typing Indicator Functions
function showTypingIndicator() {
    const chatbox = document.getElementById("chatbox");
    const typingDiv = document.createElement("div");
    typingDiv.className = "message bot-message typing-indicator";
    typingDiv.innerHTML = `
        <div class="avatar"><img src="bot-avatar.png" alt="Bot Avatar"></div>
        <div class="typing-dots">
            <span></span><span></span><span></span>
        </div>
    `;
    chatbox.appendChild(typingDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function removeTypingIndicator() {
    const typingDiv = document.querySelector(".typing-indicator");
    if (typingDiv) {
        typingDiv.remove();
    }
}

// Side Panel Option Selection
function selectOption(option) {
    let botResponse = "";
    switch(option) {
        case 'findJob':
            botResponse = "Sure! What type of job are you looking for?";
            conversationStage = 2;
            break;
        case 'profile':
            botResponse = "Here's your profile information...";
            // Implement profile fetching logic here
            break;
        case 'settings':
            botResponse = "Here are your settings options...";
            // Implement settings options here
            break;
        case 'help':
            botResponse = "How can I help you? You can ask me about job listings, your profile, or settings.";
            break;
        default:
            botResponse = "I'm not sure how to help with that.";
    }
    addMessage(botResponse, "bot-message");
}