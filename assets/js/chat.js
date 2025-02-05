async function sendMessage() {
    let userMessage = document.getElementById("userInput").value;
    if (!userMessage.trim()) return;

    let messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

    document.getElementById("userInput").value = "";

    try {
        let response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "sk-41f900adafdb4893a51771c4b72fc32c" // 替换为你的 API Key
            },
            body: JSON.stringify({
                model: "deepseek-chat", // 使用 deepseek-chat 模型
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 10, // 限制生成的最大 token 数
                stream: True // 如果不需要流式输出，设置为 false=
            })
        });

        let data = await response.json();
        let botReply = data.choices[0].message.content;

        messagesDiv.innerHTML += `<p><strong>DeepSeek Bot:</strong> ${botReply}</p>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // 滚动到底部
    } catch (error) {
        messagesDiv.innerHTML += `<p style="color:red;"><strong>Error:</strong> Server request failed</p>`;
    }
}