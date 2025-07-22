// src/components/Messages.jsx
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const messages = [
  {
    id: 1,
    name: "Horgie L. Bangon",
    message: "Hi, I would like to cancel my appointment",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    message: "Hi",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

const MessagesPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  return (
    <div className="w-full bg-white p-4">
      <h2 className="text-lg font-semibold mb-2">Messages</h2>

      {/* Search bar */}
      <div className="flex items-center gap-2 bg-gray-200 rounded px-2 py-1 mb-4">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          className="bg-transparent focus:outline-none w-full"
          placeholder="Search"
        />
      </div>

      {/* Message List */}
      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex items-center justify-between bg-gray-100 p-2 rounded relative"
          >
            <div className="flex items-center gap-2">
              <img
                src={msg.image}
                alt={msg.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-bold text-sm">{msg.name}</p>
                <p className="text-xs text-gray-600 truncate max-w-[200px]">
                  {msg.message}
                </p>
              </div>
            </div>
            <div className="relative">
              <button
                className="p-2"
                onClick={() =>
                  setDropdownOpen(dropdownOpen === msg.id ? null : msg.id)
                }
              >
                <FaEllipsisV />
              </button>
              {dropdownOpen === msg.id && (
                <div className="absolute right-0 top-8 w-40 bg-white border border-gray-300 rounded shadow-md z-10">
                  <ul className="text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      View Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Block User
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Delete Chat
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Report Chat
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
