import { SectionContainer } from "../sub-components/SectionContainer"
import "../styles/component/skills.scss"
import { FaHtml5, FaSass, FaCss3, FaReact, FaJs,FaFigma,FaGitAlt,FaJava,FaPython,FaJira } from "react-icons/fa";
import { SiTypescript,SiCplusplus,SiFlutter } from "react-icons/si";

export function Skills() {
  const skillContent = (
    <section className="section-main__container">
      <h1>My Skills</h1>
      <SkillsContent />
    </section>
  )
  
  return (
    <SectionContainer children={skillContent} />
  )
}

export function SkillsContent() {
  return (
    <div className="skills-main">
      <h4>Using Now :</h4>
      <div className="skills-grid">
        <div className="skill-item">
          <FaHtml5 className="skill-icon" />
          <span>HTML</span>
        </div>
        <div className="skill-item">
          <FaCss3 className="skill-icon" />
          <span>CSS</span>
        </div>
        <div className="skill-item">
          <FaSass className="skill-icon" />
          <span>SASS</span>
        </div>
        <div className="skill-item">
          <FaJs className="skill-icon" />
          <span>JavaScript</span>
        </div>
        <div className="skill-item">
          <FaReact className="skill-icon" />
          <span>React</span>
        </div>
        <div className="skill-item">
          <SiTypescript className="skill-icon" />
          <span>Typescript</span>
        </div>
        <div className="skill-item">
          <FaFigma className="skill-icon" />
          <span>Figma</span>
        </div>
        
      </div>
      
      <div className="skills-grid">
      <div className="skill-item">
          <FaJava className="skill-icon" />
          <span>Java</span>
        </div>
        <div className="skill-item">
          <FaPython className="skill-icon" />
          <span>Python</span>
        </div>
        <div className="skill-item">
          <SiCplusplus className="skill-icon" />
          <span>C++</span>
        </div>
        <div className="skill-item">
          <SiFlutter className="skill-icon" />
          <span>Flutter</span>
        </div>
        <div className="skill-item">
          <FaJira className="skill-icon" />
          <span>Jira</span>
        </div>
        <div className="skill-item">
          <FaGitAlt className="skill-icon" />
          <span>Git</span>
        </div>
      </div>
     
    </div>
  )
}
