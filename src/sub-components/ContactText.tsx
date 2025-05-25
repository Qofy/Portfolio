import { Github, Linkedin, Mail } from "lucide-react";


export function ContactText(){
  return(
    <div className="text-container">
        <h4>Hi, I am</h4>
        <h3>
          <em className="special-character">Kofi Safo</em> Agyekum
        </h3>
        <p>
          Front-end Engineer • UI/UX Designer • React & TypeScript Developer
        </p>
        <div>
          <a className="link" href="mailto:safokofi888@gmail.com" aria-label="Send email">
            <Mail />
          </a>
          <a 
            className="link" 
            href="https://github.com/Qofy" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
          >
            <Github />
          </a>
          <a 
            className="link" 
            href="https://www.linkedin.com/in/safo-agyekum-870569298/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
          >
            <Linkedin />
          </a>
        </div>
        
      </div>
  )
}