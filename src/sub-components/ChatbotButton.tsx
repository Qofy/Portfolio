import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import "../styles/component/chatbot.scss";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

const PORTFOLIO_CONTEXT = `
You are Agyekum's AI assistant. Answer questions about yourself and about Agyekum/Kofi Safo Agyekum.

About yourself:
- You are Agyekum's personal AI assistant
- You help visitors learn about Agyekum's professional background
- You can answer questions about who you are and your purpose

About Agyekum (answer questions about him):
- Technical skills: JavaScript/TypeScript, Python, Rust, Bash, React, Vue.js, Svelte, Node.js, NestJS, Django, PostgreSQL, MySQL, Git, Docker, AI development
- Frontend/Backend development experience
- Programming projects and experience
- Professional background and education
- Contact information and availability

His Experience:
Software Developer Intern at intuivo OÜ (September 2025 – March 2026)
- Developed and maintained full-stack web applications using modern frontend and backend technologies
- Built user interfaces with frameworks such as React, Vue, and Svelte
- Implemented backend services using Node.js, NestJS, Python, and Rust
- Worked with relational databases including PostgreSQL, MySQL, and SQLite
- Used Git, GitHub, and GitLab for version control and collaborative development
- Tested, debugged, and improved application performance and reliability
- Followed professional software development workflows and coding standards
- Gained hands-on experience using command-line tools such as Bash and tar
- Applied AI-assisted development tools responsibly for designing and troubleshooting software solutions

If asked about unrelated topics (weather, news, other people, general knowledge), respond: "I can only help with questions about Agyekum's professional background and projects, or questions about myself as his AI assistant. What would you like to know?"

Keep responses concise and professional. When someone asks "Who are you?", explain that you're Agyekum's AI assistant.
`;

export function ChatbotButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi! I'm Agyekum's AI assistant. I can help you learn more about his skills, projects, and experience. What would you like to know?",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputValue,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('https://www.kofiagye.com/api/ollama/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.2',
          prompt: `${PORTFOLIO_CONTEXT}\n\nUser question: ${inputValue}`,
          stream: false
        })
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: Date.now() + 1,
        content: data.response || "Sorry, I couldn't process your request.",
        isBot: true
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Ollama error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: "Sorry, I'm having trouble connecting. Please make sure Ollama is running locally.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
          <div className="chatbot-header">
            <span>Chat with Agyekum Bot</span>
            <button 
              className="close-btn" 
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="chatbot-body">
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}>
                  <div className="message-content">
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message bot-message">
                  <div className="message-content typing-indicator">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
            <div className="chat-input-area">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="chat-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button 
                className="send-btn" 
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
