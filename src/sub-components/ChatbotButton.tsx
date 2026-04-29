import { useState } from "react";
import { MessageCircle } from "lucide-react";
import "../styles/component/chatbot.scss";

export function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="chatbot-button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((s) => !s)}
      >
        <MessageCircle />
      </button>

      {open && (
        <div className="chatbot-window" role="dialog" aria-label="Chat window">
          <div className="chatbot-header">Chat</div>
          <div className="chatbot-body">This is a placeholder chat window.</div>
        </div>
      )}
    </>
  );
}
