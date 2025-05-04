export const DEEPSEEK_API_KEY = "sk-d886b82cf53c4fbd84c94a1c23132bde";
export const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";


export async function sendMessageToDeepSeek(userMessage) {
    const response = await fetch(DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userMessage }
            ],
            stream: false
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
