import { useState } from "react";
import AIChatInput from "./components/AIChatInput";
import AIChatResponse from "./components/AIChatResponse";
import logo from "./logo.svg";
import { md } from "./dummy";
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
          text: md,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 ">
      <div className="chatbox overflow-y-auto h-[60vh] w-[600px] border-neutral-700 border rounded-lg p-2">
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
