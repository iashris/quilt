import { useState } from "react";
import AIChatInput from "./components/AIChatInput";
import AIChatResponse from "./components/AIChatResponse";
import logo from "./logo.svg";
import { md, md2, md3 } from "./dummy";
type ChatMessage = {
  type: "user" | "ai";
  text: string;
};

function App() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const onSubmit = (message: string) => {
    setChatHistory([...chatHistory, { type: "user", text: message }]);

    // Dummy AI Response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "ai",
          text: [md2, md3, md][prev.length % 3],
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl py-4 mx-auto bg-neutral-900">
      <div className="flex flex-col flex-grow p-2 overflow-y-auto border rounded-lg border-neutral-700">
        {chatHistory.length === 0 && (
          <div className="flex items-center justify-center w-full h-full">
            <img src={logo} className="w-32" alt="logo" />
          </div>
        )}
        {chatHistory.map((message, index) =>
          message.type === "ai" ? (
            <AIChatResponse key={index} textResponse={message.text} />
          ) : (
            <div key={index} className="flex justify-end py-4 text-white">
              <span className="p-2 px-4 bg-blue-500 rounded-lg">{message.text}</span>
            </div>
          )
        )}
      </div>
      <AIChatInput onSubmit={onSubmit} />
    </div>
  );
}

export default App;
