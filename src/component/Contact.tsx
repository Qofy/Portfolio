import "../styles/component/contact.scss"
import { Github, Linkedin, Mail } from "lucide-react"
import { Nav } from "./Nav"
import { Link } from "react-router-dom"

export function Contact() {
  return (
    <section id="contact" className="contact-container">
      <div className="text-container">
        <h4>Hi, I am</h4>
        <h3>
          <em className="special-character">Kofi Safo</em> Agyekum
        </h3>
        <p>
          Front-end Engineer • UI/UX Designer • React & TypeScript Developer
        </p>
        <div>
          <Link className="link" to="mailto:safokofi888@gmail.com"><Mail /></Link>
          <Link className="link" to="https://github.com/Qofy"><Github /></Link>
          <Link className="link" to="https://www.linkedin.com/in/safo-agyekum-870569298/"><Linkedin /></Link>
        </div>
      </div>

      <div className="nav-image-container">
        <Nav nav="nav1" />
        {/* Add an image or avatar here if needed */}
      </div>

      <div className="myself-container">
        <h2>My Frontend Journey</h2>
        <p>
          My journey into frontend development began with a passion for design and interactivity during my Visual Arts & ICT studies in high school. That creative curiosity led me to explore HTML, CSS, and JavaScript—building small but exciting projects like a Facebook login clone and music web app using vanilla JS.
        </p>
        <p>
          As I progressed, I embraced modern frameworks like React and TypeScript to build responsive, accessible web apps. Projects like <strong>Teslr</strong> (a voting platform UI) and a <strong>Task Dashboard</strong> with reusable components and stateful logic showcase my growth in scalable frontend architecture.
        </p>
        <p>
          I'm currently pursuing a BSc in Software Engineering at the University of Europe for Applied Sciences, where I’ve gained experience in frontend technologies, CI/CD, CMS, UX/UI, and agile methodologies. I’ve also contributed to real-world solutions through freelance projects and collaborative environments—using tools like Figma, Git, and Docker.
        </p>
        <p>
          I take pride in crafting user-centric, performant applications and continuously strive to build experiences that are not just functional, but enjoyable. I’m excited by every opportunity to solve problems, write clean code, and grow in the fast-paced world of web development.
        </p>
      </div>
    </section>
  )
}
