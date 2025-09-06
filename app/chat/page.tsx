"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Call backend API
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    // Add AI response
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">🤖 Hugging Face Chatbot ( model mistralai/Mistral-7B-Instruct-v0.2 with @huggingface/inference package )</h1>

      <div className="w-full max-w-lg flex flex-col gap-2 bg-white p-4 rounded-2xl shadow-md h-[500px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-lg mt-4">
        <input
          className="flex-1 border rounded-l-lg p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
