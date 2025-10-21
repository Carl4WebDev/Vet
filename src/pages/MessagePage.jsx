import React, { useState, useEffect, useRef } from "react"; // ✅ added useRef
import { io } from "socket.io-client";
import { getAllClients } from "../updated-api/getAllClients";
import { useChat } from "../context/ChatContext"; // ✅ integrate global context
const API_BASE = import.meta.env.VITE_API_BASE;

import { postReport } from "../updated-api/postReport";

import defaultImage from "../assets/images/nav-profile.png";

// ✅ Added reconnection support for reliability
const socket = io(`${API_BASE}`, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
  reconnection: true, // ✅ ensures auto-reconnect
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
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
  const [searchTerm, setSearchTerm] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [reportText, setReportText] = useState("");
  const [reportImages, setReportImages] = useState([]);

  // ✅ Global chat context
  const { unreadCounts, setUnreadCounts } = useChat();

  const messagesEndRef = useRef(null);

  // ✅ Load clinic user_id and connect socket
  useEffect(() => {
    const initChat = async () => {
      const storedUserId = localStorage.getItem("user_id");
      if (!storedUserId) {
        setLoading(false);
        return;
      }

      setClinicUserId(storedUserId);

      // ✅ Always connect and immediately register the clinic user
      if (!socket.connected) socket.connect();
      socket.emit("registerUser", storedUserId);

      // ✅ Auto re-register on reconnect (in case of disconnection)
      socket.on("reconnect", () => {
        socket.emit("registerUser", storedUserId);
        console.log("🔄 Reconnected and re-registered clinic:", storedUserId);
      });

      socket.on("connect", () => {
        setIsConnected(true);
        console.log("✅ Connected to socket as clinic:", storedUserId);
      });

      try {
        const clientsList = await getAllClients(storedUserId);
        setClients(clientsList);

        const formatted = clientsList.map((c) => ({
          id: c.user_id,
          name: c.client_name || "",
          avatar: c.image_url || defaultImage,
          lastMessage: "Start a conversation...",
        }));

        setConversations(formatted);

        // ✅ Auto-join all client rooms to receive messages instantly
        const joinedRooms = new Set();
        clientsList.forEach((c) => {
          const roomId = c.user_id;
          if (!roomId || joinedRooms.has(roomId)) return;
          joinedRooms.add(roomId);
          try {
            socket.emit("joinPrivate", {
              senderId: storedUserId,
              receiverId: roomId,
            });
          } catch (err) {
            console.warn("⚠️ Failed to join room:", roomId, err);
          }
        });
      } catch (err) {
        console.error("Failed to load clients", err);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      socket.off("connect");
      socket.off("reconnect");
      socket.disconnect();
      setIsConnected(false);
    };
  }, []);

  // ✅ Socket listeners
  useEffect(() => {
    if (!isConnected) return;

    const handleLoadMessages = (oldMessages) => setMessages(oldMessages);

    const handleReceiveMessage = (message) => {
      if (!message) return;

      setMessages((prev) => [...prev, message]);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === message.senderId
            ? { ...conv, lastMessage: message.text }
            : conv
        )
      );

      // ✅ Increment unread count only if the message is not from active chat
      if (
        message.senderId !== clinicUserId &&
        message.senderId !== activeChat?.id
      ) {
        setUnreadCounts((prev) => ({
          ...prev,
          [message.senderId]: (prev[message.senderId] || 0) + 1,
        }));
      }
    };

    socket.on("loadMessages", handleLoadMessages);
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("loadMessages", handleLoadMessages);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [isConnected, clinicUserId, activeChat]);

  // ✅ Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const selectConversation = (conversation) => {
    if (!clinicUserId || !isConnected) return;
    setActiveChat(conversation);
    setMessages([]);

    socket.emit("joinPrivate", {
      senderId: clinicUserId,
      receiverId: conversation.id,
    });

    // ✅ Reset unread count for this client when opened
    setUnreadCounts((prev) => ({
      ...prev,
      [conversation.id]: 0,
    }));
  };

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

  // ✅ Filtered list for search
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          {/* ✅ Search Bar */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search clients..."
              className="w-full border border-gray-300 rounded-full px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 cursor-pointer ${
                    activeChat?.id === conv.id
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className="flex items-center flex-1"
                    onClick={() => selectConversation(conv)}
                  >
                    <div className="relative">
                      <img
                        src={conv.avatar || defaultImage}
                        alt={conv.name}
                        className="h-10 w-10 rounded-full"
                      />
                      {unreadCounts[conv.id] > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                          {unreadCounts[conv.id]}
                        </span>
                      )}
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conv.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>

                  {/* ⚙️ Three-dot button */}
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-gray-700 px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpen((prev) =>
                          prev === conv.id ? null : conv.id
                        );
                      }}
                    >
                      ⋮
                    </button>

                    {dropdownOpen === conv.id && (
                      <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-32 z-50">
                        <button
                          onClick={() => {
                            setDropdownOpen(null);
                            setReportTarget(conv);
                            setIsReportModalOpen(true);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                        >
                          Report
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4 text-sm">
                No matching clients
              </p>
            )}
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 flex flex-col h-full">
          {activeChat ? (
            <>
              <div className="flex items-center px-6 py-3 border-b bg-white">
                <img
                  src={activeChat.avatar || defaultImage}
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

              <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No messages yet.
                  </div>
                ) : (
                  messages.map((msg, i) => {
                    const isClinic =
                      Number(msg.senderId) === Number(clinicUserId);
                    return (
                      <div
                        key={i}
                        className={`flex mb-3 ${
                          isClinic ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`px-4 py-2 rounded-lg max-w-xs ${
                            isClinic
                              ? "bg-indigo-600 text-white" // ✅ Clinic (you)
                              : "bg-gray-200 text-gray-800" // ✅ Client (other)
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="bg-white border-t p-3 flex items-center sticky bottom-0">
                <input
                  type="text"
                  className="flex-1 border rounded-full px-4 py-2 mx-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
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
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">
              Report {reportTarget?.name}
            </h2>

            {/* 📝 Reason Text */}
            <textarea
              placeholder="Write your report reason..."
              className="w-full border rounded p-2 mb-3"
              rows={4}
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />

            {/* 📸 Image Upload */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setReportImages((prev) => [...prev, ...files]);
              }}
              className="mb-3"
            />

            {/* 🖼️ Preview Images */}
            {reportImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {reportImages.map((img, index) => {
                  const imgURL = URL.createObjectURL(img);
                  return (
                    <div key={index} className="relative group">
                      <img
                        src={imgURL}
                        alt={`preview-${index}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <button
                        onClick={() =>
                          setReportImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!reportText.trim())
                    return alert("Please enter a reason.");
                  if (reportImages.length > 10)
                    return alert("You can upload a maximum of 10 images.");

                  try {
                    const data = await postReport({
                      reported_user_id: reportTarget.id,
                      reporter_user_id: clinicUserId,
                      evidence_text: reportText,
                      evidence_images: reportImages,
                    });

                    alert(data.message || "✅ Report submitted successfully!");
                    setIsReportModalOpen(false);
                    setReportText("");
                    setReportImages([]);
                  } catch (err) {
                    console.error("Report submission failed:", err);
                    alert(err.message || "Failed to submit report");
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
