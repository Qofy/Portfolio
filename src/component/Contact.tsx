import "../styles/component/contact.scss"
import { Github, Linkedin, Mail } from "lucide-react"
import { Nav } from "./Nav"
import { Link } from "react-router-dom"

export function Contact() {
  return(
    <section id="contact" className="contact-container">
      <div className="text-container">
        <h4>Hi, I am</h4>
        <h3>
          <em className="special-character">Kofi Safo</em> Agyekum
        </h3>
        <p>
          Front-end Engineer / GUI Designer / Typescript and React Expert
        </p>
        <div>
          <Link className="link" to="safokofi888@gmail.com"><Mail/></Link>
          <Link className="link" to="https://github.com/Qofy"> 
          <Github/>
          </Link>
          <Link className="link" to="https://www.linkedin.com/in/safo-agyekum-870569298/">
          <Linkedin/>
          </Link>
          
        </div>
        </div>
  
      <div className="nav-image-container">
        <Nav nav="nav"/>
        Nav and image
      </div>
      <div className="myself-container">
        Myself
      </div>
    </section>
  )
}
