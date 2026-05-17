import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import "../styles/component/chatbot.scss";

interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

const PORTFOLIO_CONTEXT = `
You are an AI assistant embedded in Kofi Safo Agyekum's portfolio website. You are talking to VISITORS who are viewing the portfolio. You are NOT Agyekum — you are his assistant helping visitors learn about him.

CRITICAL RULES:
- Always refer to Agyekum in THIRD PERSON: "he", "him", "his", "Agyekum"
- NEVER say "you did" or "you worked" — the visitor is "you", Agyekum is "he/him"
- Keep answers concise and professional
- If asked something not in this context, say: "I don't have that information, but feel free to contact him at safokofi888@gmail.com"

--- PERSONAL INFO ---
Full name: Kofi Safo Agyekum
Role/Title: Front-end Engineer, Front-end Developer, Prompt Engineer
Email: safokofi888@gmail.com
GitHub: https://github.com/Qofy
LinkedIn: https://www.linkedin.com/in/kofi-agyekum-870569298/
Portfolio website: https://www.kofiagye.com/

Bio: Aspiring software developer with practical experience in front-end development, debugging, and modern development workflows gained through hands-on project work and a professional internship. Strong interest in front-end systems, software architecture, continuous learning, and backend APIs, with a focus on building reliable and maintainable software solutions. Known for persistence, attention to detail, and the ability to adapt quickly to new technologies.

--- EDUCATION ---
University: University of Europe for Applied Sciences
Degree: Bachelor of Software Engineering
Location: Hamburg, Germany
Duration: 2023 – 2026
Current Status: Thesis writing (final stage)
GPA: 76 (Major GPA)

University Courses by Semester:
- Semester 1: Programming (Python), Computer Architecture, Software Engineering 1, Mathematics and Statistics, Business Employability in English, Management Bases
- Semester 2: Big Data Analysis, Start-up Management, Parallel Programming, Back-end Development, Digital and Media Communication
- Semester 3: IT Platforms, Software Engineering 2, Cloud Computing & Distributed Systems, Operating Systems, Software Quality Assurance, GUI Design & Web Optimization
- Semester 4: Artificial Intelligence (AI), Frontend Development (Flutter, HTML, JavaScript, CSS, Node.js), IT Agile, Corporate Management, Machine Learning & Smart Systems, IT Security

--- PROFESSIONAL EXPERIENCE ---
Company: Intuivo OÜ
Location: Berlin, Germany
Role: Software Developer Intern
Duration: September 2025 – March 2026

Responsibilities:
- Developed and maintained web applications using modern frontend and backend technologies
- Built user interfaces using React, Next.js, and Svelte
- Implemented backend services using Node.js, NestJS, Python, and Rust for APIs
- Used Git and GitLab for version control and collaboration
- Tested and debugged applications to ensure reliability and performance
- Learned and applied professional software development workflows
- Used AI tools responsibly to design, implement, and troubleshoot software solutions

Achievements:
- Transitioned from theoretical knowledge to practical software development in a professional environment
- Improved debugging, problem-solving, and attention to detail
- Gained experience in modern development ecosystems and team workflows
- Built complete frontend applications connecting to backend systems
- Developed the ability to work independently on technical tasks

--- TECHNICAL SKILLS ---
Programming Languages: JavaScript, TypeScript
Frontend Development: React, Next.js, HTML/CSS, Tailwind CSS, Svelte, Vue.js
Backend Development: NestJS (for APIs), Django (for APIs), Node.js, REST API development, Python, Rust
Databases: PostgreSQL, MySQL, SQLite
Tools & Technologies: Git (GitHub, GitLab), Linux/macOS environments, Docker (basic), Logging and debugging tools, Software architecture planning, Version control workflows, Command-line tools (tar, bash utilities)
AI & Workflow: Prompt engineering, AI-assisted software development, System design and problem decomposition, Code analysis and debugging with AI tools

--- PROJECTS ---
1. Afriqnet (Featured, Ongoing)
   Description: An ongoing project to allow Africans to have their own streaming platform instead of using YouTube.
   Live URL: https://afriqnet-ten.vercel.app/
   Tech stack: Next.js, React (v19), Firebase APIs, Cloudinary, Movies APIs, Tailwind CSS, Lucide icons, Lucia (auth)

2. FirePup (Featured)
   Description: A food platform that allows users to post and share their meals and recipes.
   Live URL: https://firepup.vercel.app/community
   Tech stack: Next.js, Cloudinary, Lucide icons

3. My Portfolio (Featured)
   Description: A portfolio containing information about Agyekum, including his experience, background, contact information, and projects.
   Live URL: https://www.kofiagye.com/
   Tech stack: TypeScript, React, SCSS, Vite, Lucide icons, React Router, React Hash Link
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
      // Build full conversation history for follow-up context
      const conversationHistory = messages
        .filter(m => m.id !== 1) // exclude the initial greeting (not a real API message)
        .map(m => ({
          role: m.isBot ? 'assistant' : 'user',
          content: m.content
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemma3:4b',
          messages: [
            { role: 'system', content: PORTFOLIO_CONTEXT },
            ...conversationHistory,
            { role: 'user', content: inputValue }
          ],
          stream: false
        })
      });

      const data = await response.json();
      
      const botMessage: Message = {
        id: Date.now() + 1,
        content: data.message?.content || data.choices?.[0]?.message?.content || "Sorry, I couldn't process your request.",
        isBot: true
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Ollama Cloud error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: "Sorry, I'm having trouble connecting to the AI service. Please try again in a moment.",
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
