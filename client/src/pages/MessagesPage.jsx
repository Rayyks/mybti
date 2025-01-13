import React, { useState } from "react";
import { Send, Phone, Video, Info, Heart, Image, Smile } from "lucide-react";

const MessagesPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! How's it going? 👋",
      sender: "other",
      timestamp: new Date(Date.now() - 3600000),
      isLiked: false,
    },
    {
      id: 2,
      text: "I'm doing great! Just working on some designs 🎨",
      sender: "user",
      timestamp: new Date(Date.now() - 1800000),
      isLiked: false,
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: inputText,
          sender: "user",
          timestamp: new Date(),
          isLiked: false,
        },
      ]);
      setInputText("");
    }
  };

  const toggleLike = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, isLiked: !msg.isLiked } : msg
      )
    );
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
      {/* Messages Container */}
      <div className="flex-1 flex flex-col w-full bg-white dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center px-6 py-3 border-b dark:border-gray-700">
          <div className="flex items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                John Doe
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Active now
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Video className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Info className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } group`}
            >
              {message.sender === "other" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0 flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-semibold">JD</span>
                </div>
              )}
              <div className="flex items-end group">
                <div
                  className={`max-w-lg px-4 py-2 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs mt-1 block opacity-70">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <button
                  onClick={() => toggleLike(message.id)}
                  className={`ml-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                    message.isLiked
                      ? "text-red-500"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Heart
                    className="w-4 h-4"
                    fill={message.isLiked ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t dark:border-gray-700 px-6 py-4">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <Image className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message..."
                className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2 rounded-full ${
                inputText.trim()
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-gray-400"
              }`}
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
