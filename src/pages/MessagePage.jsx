import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getClientsByClinic } from "../api/get/getClientsByClinic"; // 👈 Replace with your actual client fetch API
const API_BASE = import.meta.env.VITE_API_BASE;

// ✅ Socket initialized outside component
const socket = io(`${API_BASE}`, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
});

export default function ChatPage() {
  const [clinicUserId, setClinicUserId] = useState(null);
  const [clients, setClients] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  console.log("clients");
  console.log(clients);
  console.log(conversations);

  // ✅ Load clinic user_id and connect socket
  useEffect(() => {
    const initChat = async () => {
      const storedUserId = localStorage.getItem("user_id");
      if (!storedUserId) {
        setLoading(false);
        return;
      }

      setClinicUserId(storedUserId);

      if (!socket.connected) {
        socket.connect();
      }

      socket.on("connect", () => {
        socket.emit("registerUser", storedUserId);
        setIsConnected(true);
      });

      // Load clients list
      try {
        const clientsList = await getClientsByClinic(storedUserId);
        setClients(clientsList);

        // Convert to conversation structure
        const formatted = clientsList.map((c) => ({
          id: c.user_id,
          name: c.client_name || "",
          avatar: c.image_url || "/default-avatar.png", // ✅ use backend image_url
          lastMessage: "Start a conversation...",
        }));

        setConversations(formatted);
      } catch (err) {
        console.error("Failed to load clients", err);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      socket.off("connect");
      socket.disconnect();
      setIsConnected(false);
    };
  }, []);

  // ✅ Socket listeners for messages
  useEffect(() => {
    if (!isConnected) return;

    const handleLoadMessages = (oldMessages) => {
      setMessages(oldMessages);
    };

    const handleReceiveMessage = (message) => {
      setMessages((prev) => [...prev, message]);
      // Update conversation preview
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === message.senderId
            ? { ...conv, lastMessage: message.text }
            : conv
        )
      );
    };

    socket.on("loadMessages", handleLoadMessages);
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("loadMessages", handleLoadMessages);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [isConnected, clinicUserId, activeChat]);

  // ✅ Select conversation
  const selectConversation = (conversation) => {
    if (!clinicUserId || !isConnected) return;
    setActiveChat(conversation);
    setMessages([]);

    socket.emit("joinPrivate", {
      senderId: clinicUserId,
      receiverId: conversation.id,
    });
  };

  // ✅ Send message
  const sendMessage = () => {
    if (!input.trim() || !activeChat || !clinicUserId) return;

    const newMsg = {
      senderId: clinicUserId,
      receiverId: activeChat.id,
      text: input,
    };

    socket.emit("sendPrivateMessage", newMsg);
    setInput("");

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeChat.id ? { ...conv, lastMessage: input } : conv
      )
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!clinicUserId) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Not Logged In
          </h2>
          <p className="text-gray-600">
            Please log in to use the chat feature.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] flex flex-col">
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
          <div
            className={`p-4 text-white font-bold text-lg ${
              isConnected ? "bg-indigo-600" : "bg-red-600"
            }`}
          >
            Clients
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-center px-4 py-3 border-b border-gray-100 cursor-pointer ${
                  activeChat?.id === conv.id ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => selectConversation(conv)}
              >
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3 min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {conv.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="flex items-center px-6 py-3 border-b bg-white">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {activeChat.name}
                  </p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No messages yet.
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex mb-3 ${
                        msg.senderId === clinicUserId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg max-w-xs ${
                          msg.senderId === clinicUserId
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-800 border"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="bg-white border-t p-3 flex items-center">
                <input
                  type="text"
                  className="flex-1 border rounded-full px-4 py-2 mx-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  // onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  disabled={!isConnected}
                />
                <button
                  onClick={sendMessage}
                  disabled={!isConnected || !input.trim()}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                💬
              </div>
              <h3 className="text-lg font-medium mb-1">Clinic Chat</h3>
              <p className="text-sm">Select a client to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
