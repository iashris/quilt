import React, { useState } from "react";

type AIChatInputProps = {
  onSubmit: (message: string) => void;
};

const AIChatInput: React.FC<AIChatInputProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSubmit(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full my-2 border rounded-lg shadow-sm bg-neutral-800 border-neutral-600 text-neutral-400">
      <div className="flex items-center p-4">
        <textarea
          className="flex-1 h-16 p-2 border rounded bg-neutral-700 border-neutral-600 text-neutral-300"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}></textarea>
        <button
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatInput;
