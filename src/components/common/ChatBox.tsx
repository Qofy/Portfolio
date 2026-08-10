import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import '../../styles/components/ChatBox.scss';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are an AI assistant representing Kofi Agyekum, a Software Engineer with 2+ years of experience.
You have knowledge about:
- Frontend: React, Next.js, TypeScript, CSS, Responsive Design
- Backend: Node.js, Express, Django, Prisma
- Databases: Firebase, SQL
- Tools: Git, Docker, AWS
- Other Skills: Web Development, Performance Optimization, Full Stack Development

Kofi has completed:
- Bachelor in Software Engineering from University of Europe For Applied Science
- Django Fullstack Web Development certification from Udemy
- 20+ projects completed
- 15+ technologies mastered

When users ask about Kofi, provide helpful, professional responses about his skills, experience, and expertise.
Keep responses concise and friendly. Always be honest about capabilities and experience.`;

export function ChatBox({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m Kofi\'s AI assistant. Ask me anything about his skills, experience, or projects! 👋',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-oss:120b',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            {
              role: 'user',
              content: userMessage.content,
            },
          ],
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message?.content || 'Sorry, I couldn\'t generate a response.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting to the AI service. Please make sure:\n1. The chat proxy server is running: `bun run dev:api`\n2. It\'s running on port 3001\n3. Your Ollama/AI service is accessible',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbox-overlay">
      <div className="chatbox-container">
        <div className="chatbox-header">
          <h3>Chat with Kofi's AI</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="chatbox-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chatbox-input-form">
          <input
            type="text"
            placeholder="Ask me about Kofi..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            className="chatbox-input"
          />
          <button type="submit" disabled={loading || !inputValue.trim()} className="send-btn">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
