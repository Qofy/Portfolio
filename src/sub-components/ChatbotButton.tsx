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

Bio: Software Engineer with professional experience at theSOFTtribe Ltd. and Intuivo OÜ. Specialises in frontend development with React, Next.js, and modern web technologies. Full-stack capabilities with Node.js, Express, and Django REST Framework. Built and shipped production applications across Ghana and Germany. Known for clean code, strong attention to detail, and the ability to adapt quickly to new technologies and teams.

--- EDUCATION ---
University: University of Europe for Applied Sciences
Degree: Bachelor of Software Engineering
Location: Potsdam, Germany
German Grade: 2.3 (Good)

University Courses by Semester:
- Semester 1: Programming (Python), Computer Architecture, Software Engineering 1, Mathematics & Statistics, Business English, Management Fundamentals
- Semester 2: Big Data Analysis, Start-up Management, Parallel Programming, Back-end Development, Digital & Media Communication
- Semester 3: IT Platforms, Software Engineering 2, Cloud Computing & Distributed Systems, Operating Systems, Software Quality Assurance, GUI Design & Web Optimization
- Semester 4: Artificial Intelligence (AI), Frontend Development (Flutter, HTML, JavaScript, CSS, Node.js), IT Agile, Corporate Management, Machine Learning & Smart Systems, IT Security

--- PROFESSIONAL EXPERIENCE ---
Total: 2+ years of professional experience across theSOFTtribe Ltd. and Intuivo OÜ, spanning Ghana and Germany.

1. Intuivo OÜ — Software Engineer
   Location: Berlin, Germany
   Period: September 2025 – May 2026
   Responsibilities:
   - Developed and maintained production-grade web applications using React, Next.js, and TypeScript
   - Designed and implemented responsive user interfaces with performance optimization
   - Integrated backend APIs and third-party services using Django REST Framework and Firebase
   - Collaborated with cross-functional teams using Git and GitLab workflows
   - Conducted end-to-end testing with Cypress and performance debugging
   - Leveraged AI-assisted development tools for improved productivity
   Achievements:
   - Successfully transitioned from academic concepts to production-level software development
   - Delivered fully functional frontend applications integrated with backend APIs
   - Gained hands-on experience in agile development environments
   - Demonstrated ability to work independently on complex technical tasks

2. theSOFTtribe Ltd. — Frontend Developer
   Location: Greater Accra, Ghana (On-site)
   Period: March 2022 – July 2023
   Responsibilities:
   - Designed and implemented responsive frontend interfaces for enterprise-level web applications
   - Built and maintained UI components using TypeScript and modern web technologies
   - Collaborated with cross-functional teams on client-facing software products
   - Contributed to Ghana's leading enterprise software development company
   Achievements:
   - Completed 1.5 years of full-time on-site professional frontend development
   - Gained foundational experience working alongside senior engineers at enterprise-level

--- TECHNICAL SKILLS ---

Programming Languages:
- JavaScript, TypeScript, Python

Frontend Development:
- React (Hooks, Components, State Management)
- Context API
- State Management Patterns
- Next.js (SSR, SSG, API Routes, Routing)
- Redux / Redux Toolkit
- Tailwind CSS, SCSS, HTML/CSS

Backend Development:
- Node.js
- Express.js (Middleware, Routing, Controllers, Error Handling)
- Prisma
- JWT Authentication
- Django REST Framework (Serializers, Viewsets, Permissions)
- REST API Development
- Firebase
- AWS S3

Auth & Integrations:
- Clerk, Lucia Auth
- Axios
- Third-party API Integration
- React Query, Formik

Tools & Technologies:
- Git (GitHub, GitLab), Docker (Basic)
- Linux/macOS, Vite, Cypress
- Command-line Tools, Software Architecture Planning
- Version Control Workflows, Debugging & Logging Tools

AI & Development Workflow:
- Prompt Engineering
- AI-assisted Software Development
- Code Rabbit
- System Design & Problem Decomposition
- Code Analysis & Debugging with AI Tools

--- PROJECTS ---
1. Afriqnet (Featured)
   Description: A streaming platform built for African audiences — a homegrown alternative to YouTube, featuring movies, shows, and content that reflects African stories and culture. Full-featured with user authentication, advanced search, video streaming, and personalized recommendations.
   Live: https://afriqnet-ten.vercel.app/
   Repository: https://github.com/Qofy/AfriqNet
   Tech: Next.js, React (v19), Redux Toolkit, Django REST Framework, Firebase, AWS S3, Tailwind CSS, React Query, Axios

2. FirePup (Featured)
   Description: A community food-sharing platform enabling users to discover, share, and inspire others with recipes and meal ideas from around the world. Features social interactions including likes, comments, and community feed.
   Live: https://firepup.vercel.app/community
   Tech: Next.js, React, Cloudinary, Tailwind CSS, SCSS

3. NutriScan (Featured)
   Description: An AI-powered health assistant application for dietary analysis and nutrition management. Helps users track and evaluate food prescriptions with intelligent recommendations and visual analytics.
   Live: https://nutri-scan-murex.vercel.app
   Tech: React, Next.js, Redux Toolkit, Django REST API, Cloudinary, Canvas, Chart.js, Formik, Zod

4. HexaShop (Featured)
   Description: Full-featured e-commerce platform for fashion retail with multi-category browsing, shopping cart, checkout flow, order tracking, and purchase history management. Demonstrates full-stack capabilities.
   Live: https://hexashop-theta.vercel.app
   Repository: https://github.com/Qofy/hexashop
   Tech: Next.js 16, TypeScript, Redux Toolkit, React Query, Tailwind CSS, Formik, Yup

5. My Portfolio (Featured)
   Description: Personal portfolio showcasing background, experience, projects, and professional journey — built with clean design and performance optimization.
   Live: https://www.kofiagye.com/
   Repository: https://github.com/Qofy/Portfolio
   Tech: React, TypeScript, React Router, SCSS, Vite
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
          model: 'nemotron-3-nano:30b',
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
