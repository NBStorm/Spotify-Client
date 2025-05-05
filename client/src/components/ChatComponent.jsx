// components/ChatComponent.jsx
import React, { useState } from "react";
import { sendMessageToDeepSeek } from "../api/deepseek";

const ChatComponent = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        try {
            setLoading(true);
            const result = await sendMessageToDeepSeek(input);
            setResponse(result);
        } catch (err) {
            setResponse("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">DeepSeek Chat</h1>
            {response && (
                <div className="mt-4 p-4 bg-gray-100 rounded text-black">
                    <strong>Response:</strong>
                    <p>{response}</p>
                </div>
            )}

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full mt-2 p-2 border rounded"
                rows={4}
                placeholder="Type your message here..."
            />
            <button
                onClick={handleSend}
                disabled={loading}
                className="mt-2 px-4 py-2 bg-green-700 text-white rounded"
            >
                {loading ? "Sending..." : "Send"}
            </button>
        </div>
    );
};

export default ChatComponent;
