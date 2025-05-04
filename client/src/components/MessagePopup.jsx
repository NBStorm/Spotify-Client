import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
const MessagePopup = ({ onClose }) => {
    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState({});
    const [messageInput, setMessageInput] = useState("");
    const chatEndRef = useRef(null);
    const socketRef = useRef(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const fetchMessagesForSelectedChat = async (chatId) => {
        console.log("Fetching all messages for chat ID:", chatId);
        try {
            // Gửi yêu cầu GET để lấy toàn bộ tin nhắn trong cuộc trò chuyện
            const res = await fetch(`http://127.0.0.1:8000/api/chats/detail/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            });

            const data = await res.json();
            console.log("Fetched messages:", data);

            if (data?.success && Array.isArray(data?.chat_messages)) {
                // Sắp xếp tin nhắn theo thời gian (cũ đến mới)
                const sortedMessages = data.chat_messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

                // Cập nhật các tin nhắn vào state
                setMessages((prevMessages) => ({
                    ...prevMessages,
                    [chatId]: sortedMessages,  // Cập nhật tin nhắn mới vào state
                }));
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };



    useEffect(() => {
        if (selectedChat) {
            fetchMessagesForSelectedChat(selectedChat.chat_id);
        }
    }, [selectedChat]);

    useEffect(() => {
        const token = localStorage.getItem("access");
        // setCurrentUserId(token);
        if (token) {
            let decodedToken = jwtDecode(token);
            // console.log(decodedToken);
            setCurrentUserId(decodedToken.id);
        }
    }, []);
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/chats/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });
                const data = await res.json();

                if (data?.success && Array.isArray(data.result)) {
                    setChatList(data.result);
                    const initialMessages = {};
                    data.result.forEach((chat) => {
                        const chatId = chat.chat_id;
                        initialMessages[chatId] = chat.chat_message ? [chat.chat_message] : [];
                    });
                    setMessages(initialMessages);
                }
            } catch (error) {
                console.error("Failed to fetch chats", error);
            }
        };

        fetchChats();
    }, []);

    useEffect(() => {
        if (selectedChat) {
            // Mở kết nối WebSocket cho chat đã chọn
            const socket = new WebSocket(
                `ws://127.0.0.1:8000/ws/chat/${selectedChat.chat_id}/`
            );

            socketRef.current = socket;

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.chat_id) {
                    setMessages((prev) => ({
                        ...prev,
                        [data.chat_id]: [...(prev[data.chat_id] || []), data],
                    }));
                }
            };
            // console.log(messages);
            socket.onclose = () => {
                console.log("WebSocket closed for chat ID", selectedChat.chat_id);
            };

            return () => {
                socket.close();
            };
        }
    }, [selectedChat]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, selectedChat]);

    const getChatPartnerName = (chat) =>
        chat.user1_id === currentUserId ? chat.user2_name : chat.user1_name;

    const getChatPartnerId = (chat) =>
        chat.user1_id === currentUserId ? chat.user2_id : chat.user1_id;

    const handleSend = () => {
        if (!messageInput.trim() || !selectedChat) return;
        console.log("Sending message:", messageInput);
        const newMessage = {
            chat_id: selectedChat.chat_id,
            sender_id: currentUserId,
            message_text: messageInput,
        };


        const socket = socketRef.current;

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(newMessage));
            setMessageInput("");
        } else {
            console.error("WebSocket chưa sẵn sàng. Đợi một chút...");
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const selectedMessages = selectedChat ? messages[selectedChat.chat_id] || [] : [];

    return (
        <div className="fixed bottom-20 right-6 w-[500px] h-[500px] bg-neutral-900 rounded-lg shadow-lg z-50 flex flex-col border border-neutral-700">
            <div className="flex justify-between items-center p-3 border-b border-neutral-700 text-white">
                <span className="font-semibold">Messages</span>
                <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="flex flex-1 min-h-0">
                <div className="w-1/3 border-r border-neutral-700 overflow-y-auto">
                    {chatList.map((chat) => {
                        const partnerName = getChatPartnerName(chat);
                        const lastMessageTime = chat.chat_message?.created_at
                            ? formatDate(chat.chat_message.created_at)
                            : null;

                        return (
                            <div
                                key={chat.chat_id}
                                onClick={() => setSelectedChat(chat)}
                                className={`p-3 cursor-pointer hover:bg-neutral-800 text-white ${selectedChat?.chat_id === chat.chat_id ? "bg-neutral-800" : ""}`}
                            >
                                <div className="font-medium">{partnerName}</div>
                                {lastMessageTime && (
                                    <div className="text-xs text-gray-400">{lastMessageTime}</div>
                                )}
                                <div className="text-xs text-gray-400 truncate">
                                    {chat.chat_message?.message_text || "No messages"}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-2/3 flex flex-col min-h-0">

                    <div className="flex-1 overflow-y-auto p-3 text-white break-words max-h-[650px]">
                        {selectedChat ? (
                            messages[selectedChat.chat_id]?.length ? (
                                messages[selectedChat.chat_id].map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`mb-2 text-sm ${msg.sender_id === currentUserId ? "text-right" : "text-left"}`}
                                    >
                                        <span
                                            className={`inline-block max-w-[80%] px-3 py-2 rounded break-words ${msg.sender_id === currentUserId
                                                ? "bg-blue-600 text-white ml-auto"  // Tin nhắn của người dùng hiện tại căn phải
                                                : "bg-neutral-700 text-white mr-auto" // Tin nhắn của người khác căn trái
                                                }`}
                                        >
                                            {msg.message_text}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400">No messages yet.</p>
                            )
                        ) : (
                            <p className="text-sm text-gray-400">Select a user to chat.</p>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="p-3 border-t border-neutral-700 flex gap-2">
                        <input
                            disabled={!selectedChat}
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 bg-neutral-800 text-white text-sm px-3 py-2 rounded outline-none"
                            placeholder={!selectedChat ? "Select a user to start chatting" : "Type a message..."}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!selectedChat}
                            className={`px-3 py-2 rounded ${!selectedChat
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagePopup;
