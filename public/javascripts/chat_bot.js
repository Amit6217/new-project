document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotBody = document.getElementById('chatbot-body');

    if (chatbotIcon && chatbotWindow && chatbotClose) {
        chatbotIcon.addEventListener('click', () => {
            chatbotWindow.style.display = 'flex';
        });
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
        });
    }

    // Add Buddy's greeting at the start
    const greetingMsg = document.createElement('div');
    greetingMsg.className = 'chatbot-bot-msg chatbot-bubble';
    greetingMsg.innerHTML = `<span class="chatbot-label">Buddy:</span> Hi, I'm Buddy! I'm here to guide you.`;
    chatbotBody.appendChild(greetingMsg);

    async function sendMessage(message) {
        // Show user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chatbot-user-msg chatbot-bubble';
        userMsg.innerHTML = `<span class="chatbot-label">You:</span> ${message}`;
        chatbotBody.appendChild(userMsg);

        // Show loading animation
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'chatbot-loading';
        loadingMsg.innerHTML = `<span class="chatbot-label">Buddy:</span> <span class="chatbot-dots"><span></span><span></span><span></span></span>`;
        chatbotBody.appendChild(loadingMsg);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        // Call OpenRouter API
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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',
                },
                body: JSON.stringify({
                    model: "mistralai/devstral-small:free",
                    messages: [
                        {
                            role: "system",
                            content: `You are a helpful assistant with a slightly slang tone for the Student Portal website.
The website helps students access:
- their library: https://yourdomain.com/Library/library.html (search books, notes, and more)
- the marketplace: https://yourdomain.com/Market/market.html (buy/sell items)
- their profile: https://yourdomain.com/index.html (view info/settings)
If a student asks about these features, give friendly answers and share the relevant links.`
                        },
                        { role: "user", content: message }
                    ]
                })
            });
            const data = await response.json();

            // Remove loading animation
            chatbotBody.removeChild(loadingMsg);

            const botMsg = document.createElement('div');
            botMsg.className = 'chatbot-bot-msg chatbot-bubble';
            botMsg.innerHTML = `<span class="chatbot-label">Buddy:</span> ${data.choices?.[0]?.message?.content || "Sorry, no response."}`;
            chatbotBody.appendChild(botMsg);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        } catch (err) {
            chatbotBody.removeChild(loadingMsg);
            const errorMsg = document.createElement('div');
            errorMsg.className = 'chatbot-bot-msg chatbot-bubble';
            errorMsg.innerHTML = `<span class="chatbot-label">Buddy:</span> Sorry, there was an error.`;
            chatbotBody.appendChild(errorMsg);
        }
    }

    if (chatbotSend && chatbotInput) {
        chatbotSend.addEventListener('click', () => {
            const message = chatbotInput.value.trim();
            if (message) {
                sendMessage(message);
                chatbotInput.value = '';
            }
        });
        chatbotInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                chatbotSend.click();
            }
        });
    }
});