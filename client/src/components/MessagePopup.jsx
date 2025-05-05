import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

const MessagePopup = ({ onClose }) => {
    const [chatList, setChatList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState({});
    const [messageInput, setMessageInput] = useState("");
    const [staffUsers, setStaffUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const chatEndRef = useRef(null);
    const socketRef = useRef(null);
    const [openMessageIdx, setOpenMessageIdx] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            const decoded = jwtDecode(token);
            setCurrentUserId(decoded.id);
        }
    }, []);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/chats", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });
                const data = await res.json();
                console.log("Fetched chssssssssssssssssssssssssat data:", data); // Debugging line
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
        const fetchStaffUsers = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/users/staff/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });
                const data = await res.json();
                if (data.success) {
                    setStaffUsers(data.staff_users);
                }
            } catch (error) {
                console.error("Failed to fetch staff users", error);
            }
        };
        fetchStaffUsers();
    }, []);

    useEffect(() => {
        if (selectedChat) {
            const fetchMessages = async () => {
                try {
                    const res = await fetch(`http://127.0.0.1:8000/api/chats/detail/${selectedChat.chat_id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access")}`,
                        },
                    });
                    const data = await res.json();


                    if (data?.success && Array.isArray(data.chat_messages)) {
                        const sortedMessages = data.chat_messages.sort(
                            (a, b) => new Date(a.created_at) - new Date(b.created_at)
                        );
                        setMessages((prev) => ({
                            ...prev,
                            [selectedChat.chat_id]: sortedMessages,
                        }));
                    }
                } catch (error) {
                    console.error("Failed to fetch messages", error);
                }
            };
            fetchMessages();
        }
    }, [selectedChat]);

    useEffect(() => {
        if (selectedChat) {
            const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${selectedChat.chat_id}/`);
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

            socket.onclose = () => {
                console.log("WebSocket closed");
            };

            return () => socket.close();
        }
    }, [selectedChat]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, selectedChat]);

    const getChatWithUser = async (user2_id) => {
        try {
            const token = localStorage.getItem("access");

            // 1. Kiểm tra xem chat đã tồn tại chưa
            const checkRes = await fetch("http://127.0.0.1:8000/api/chats/is_created", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ user2_id }),
            });

            const checkData = await checkRes.json();
            if (!checkData.success) return;

            // 2. Nếu chat đã tồn tại
            if (checkData.is_created) {
                const existingChat = chatList.find(
                    (chat) =>
                        (chat.user1_id === currentUserId && chat.user2_id === user2_id) ||
                        (chat.user1_id === user2_id && chat.user2_id === currentUserId)
                );

                if (existingChat) {
                    setSelectedChat(existingChat);
                    loadMessages(existingChat.chat_id); // ✅ Tự động load sau khi chọn
                }
                return;
            }

            // 3. Nếu chưa có chat, tạo mới
            const createRes = await fetch("http://127.0.0.1:8000/api/chats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ user2_id }),
            });

            const createData = await createRes.json();
            if (!createData.success) return;

            // 4. Lấy lại danh sách chat
            const updatedChatsRes = await fetch("http://127.0.0.1:8000/api/chats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedChatsData = await updatedChatsRes.json();
            if (!updatedChatsData.success) return;

            setChatList(updatedChatsData.result);

            // 5. Tìm và thiết lập chat vừa tạo
            const newChat = updatedChatsData.result.find(
                (chat) =>
                    (chat.user1_id === currentUserId && chat.user2_id === user2_id) ||
                    (chat.user1_id === user2_id && chat.user2_id === currentUserId)
            );

            if (!newChat) return;

            setSelectedChat(newChat);

            // 6. Gửi tin nhắn mặc định rỗng
            // const newMessage = {
            //     message_text: null,
            //     sender_id: currentUserId,
            // };

            // await fetch(`http://127.0.0.1:8000/api/chats/${newChat.chat_id}/messages/`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: `Bearer ${token}`,
            //     },
            //     body: JSON.stringify(newMessage),
            // });

            // 7. Load lại tin nhắn của chat mới
            loadMessages(newChat.chat_id);
        } catch (error) {
            console.error("Error in getChatWithUser:", error);
        }
    };



    const loadMessages = async (chat_id) => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/chats/detail/${chat_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                },
            });
            const data = await res.json();
            if (data?.success && Array.isArray(data.chat_messages)) {
                const sortedMessages = data.chat_messages.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );
                setMessages((prev) => ({
                    ...prev,
                    [chat_id]: sortedMessages,
                }));
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const handleSend = () => {
        if (!messageInput.trim() || !selectedChat) return;
        const newMessage = {
            chat_id: selectedChat.chat_id,
            sender_id: currentUserId,
            message_text: messageInput,
        };

        const socket = socketRef.current;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(newMessage));
            setMessageInput("");
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
            <div className="flex justify-between items-center p-3 border-b border-neutral-700 rounded-t-lg text-white bg-green-700">
                <span className="font-semibold">Messages</span>
                <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="flex flex-1 min-h-0">
                {/* Staff user list */}
                <div className="w-1/3 border-r border-neutral-700 overflow-y-auto">
                    <div className="p-2 text-gray-400 text-sm border-b border-neutral-700">
                        Users
                    </div>
                    {staffUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => getChatWithUser(user.id)}
                            className="p-3 cursor-pointer hover:bg-neutral-800 text-white" style={{ backgroundColor: selectedChat?.user2_id === user.id ? "#17a147" : "transparent" }}
                        >
                            <div className="font-medium">{user.username}</div>
                            <div className="text-xs text-gray-300 truncate">{user.email}</div>

                        </div>

                    ))}
                </div>

                {/* Right panel */}
                <div className="w-2/3 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto p-3 text-white break-words">
                        {selectedChat ? (
                            selectedMessages.length ? (
                                selectedMessages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`mb-2 text-sm group ${msg.sender_id === currentUserId ? "text-right" : "text-left"}`}
                                    >
                                        <span
                                            className={`inline-block max-w-[80%] px-3 py-2 rounded-full break-words relative 
                        ${msg.sender_id === currentUserId
                                                    ? "bg-green-500 text-white ml-auto"
                                                    : "bg-neutral-700 text-white mr-auto"
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Không làm ảnh hưởng phần tử cha
                                                setOpenMessageIdx(prev => prev === idx ? null : idx);
                                            }}   >
                                            {msg.message_text}

                                            {/* Hover time */}
                                            <span
                                                className={`
                                absolute -top-5 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                ${msg.sender_id === currentUserId ? "left-0" : "right-0"}
                            `}
                                            >
                                                {msg.time}
                                            </span>



                                        </span>
                                        {openMessageIdx === idx && (
                                            <div className="text-xs text-gray-300 mt-1">{msg.date}</div>
                                        )}
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
                            // disabled={!selectedChat}
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 bg-neutral-800 text-white text-sm px-3 py-2  rounded-full outline-none"
                            placeholder={!selectedChat ? "Select a user to start chatting" : "Type a message..."}
                        />
                        <button
                            onClick={handleSend}
                            // disabled={!selectedChat}
                            className={`px-3 py-2 rounded-full ${!selectedChat
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-green-700 text-white hover:bg-gray-700 "
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
