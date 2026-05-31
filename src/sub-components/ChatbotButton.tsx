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

Bio: Software Engineer with 2+ years of professional experience at Platinum Africa Solution Ltd. and Intuivo OÜ, plus ongoing freelance work. Specialises in front-end development with React, Next.js, and React Native. Built and shipped production applications across Ghana and Germany. Known for clean code, strong attention to detail, and the ability to adapt quickly to new technologies and teams.

--- EDUCATION ---
University: University of Europe for Applied Sciences
Degree: Bachelor of Software Engineering
Location: Hamburg, Germany
Duration: 2023 – 2026
Current Status: Thesis Writing (final stage)
GPA: 76 (Major GPA)

University Courses by Semester:
- Semester 1: Programming (Python), Computer Architecture, Software Engineering 1, Mathematics & Statistics, Business English, Management Fundamentals
- Semester 2: Big Data Analysis, Start-up Management, Parallel Programming, Back-end Development, Digital & Media Communication
- Semester 3: IT Platforms, Software Engineering 2, Cloud Computing & Distributed Systems, Operating Systems, Software Quality Assurance, GUI Design & Web Optimization
- Semester 4: Artificial Intelligence (AI), Frontend Development (Flutter, HTML, JavaScript, CSS, Node.js), IT Agile, Corporate Management, Machine Learning & Smart Systems, IT Security

--- PROFESSIONAL EXPERIENCE ---
Total: 2+ years of focused professional experience across Platinum Africa and Intuivo, plus current freelance work.

1. Safo Kofi — Freelance Frontend Developer
   Location: Hamburg, Germany
   Period: May 2026 – Present
   Responsibilities:
   - Building web applications and mobile apps for clients as an independent freelance developer
   - Developing cross-platform mobile apps using React Native and Expo
   - Integrating third-party services including Clerk, Axios, and Django REST Framework
   - Managing full project lifecycles from design to deployment
   Achievements:
   - Established an independent freelance practice serving clients remotely from Hamburg
   - Delivering projects using React, React Native, Next.js, Redux, and Django REST Framework

2. Intuivo OÜ — Software Engineer
   Location: Berlin, Germany
   Period: September 2025 – May 2026
   Responsibilities:
   - Developed and maintained web applications using modern frontend frameworks
   - Implemented backend services using Django REST Framework
   - Built user interfaces with React, Next.js, and Svelte
   - Used Git and GitLab for version control and team collaboration
   - Tested and debugged applications to ensure reliability and performance
   - Used AI tools responsibly to design, implement, and troubleshoot software solutions
   Achievements:
   - Engineered production-level frontend and backend features within a team of software architects
   - Built complete frontend applications integrated with backend APIs
   - Developed the ability to work independently on complex technical tasks

3. Platinum Africa Solution Ltd. — Software Developer
   Location: Ghana (Remote)
   Period: March 2024 – April 2025
   Responsibilities:
   - Built full-stack web applications for clients seeking business software solutions
   - Managed and maintained client web applications end-to-end
   - Developed frontend interfaces using Next.js and Redux.js
   - Collaborated remotely with clients to deliver reliable and scalable solutions
   Achievements:
   - Delivered multiple full-stack client projects over a 1-year engagement
   - Strengthened expertise in Next.js, Redux.js, and remote team workflows

--- TECHNICAL SKILLS ---
Programming Languages: JavaScript, TypeScript
Frontend: React, Next.js, React Native, Redux, Redux Toolkit, HTML/CSS, Tailwind CSS, SCSS, Svelte, Vue.js, Firebase, Expo
Backend: Django REST Framework, NestJS, Node.js, REST API development
Tools & Technologies: Git (GitHub, GitLab), Linux/macOS, Docker (basic), Logging & debugging tools, Software architecture planning, Command-line tools (Bash)
AI & Workflow: Prompt engineering, AI-assisted development, System design, Code analysis and debugging with AI tools

--- PROJECTS ---
1. Afriqnet (Featured, Ongoing)
   Description: A streaming platform built for African audiences — a homegrown alternative to YouTube, featuring movies, shows, and content that reflects African stories and culture.
   Live: https://afriqnet-ten.vercel.app/
   Tech: Next.js, React (v19), Redux Toolkit, Firebase, Cloudinary, Movies API, Tailwind CSS, Lucia (auth), Lucide Icons

2. FirePup (Featured)
   Description: A community food platform where users can post, share, and discover meals and recipes from around the world.
   Live: https://firepup.vercel.app/community
   Tech: Next.js, Cloudinary, Lucide Icons

3. NutriScan (Featured)
   Description: An AI-powered health assistant that helps patients track and evaluate their dietary food prescriptions for better nutrition management.
   Live: https://nutri-scan-murex.vercel.app
   Tech: Next.js, React, Redux Toolkit, Django REST API, Cloudinary, Tailwind CSS, Canvas, Lucide Icons

4. My Portfolio (Featured)
   Description: A personal portfolio showcasing his background, experience, projects, and contact information — built with a focus on clean design and performance.
   Live: https://www.kofiagye.com/
   Tech: TypeScript, React, React Router, Hash Link, SCSS, Vite, Lucide Icons
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
