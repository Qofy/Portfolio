// import { SectionContainer } from "../sub-components/SectionContainer"
import "../styles/component/skills.scss"
import { skillsData } from "../data/skillsData"
import { Projects } from "./Projects"

export function Skills() {
  const skillsContent = (
    <>
    <div className="skills-main">
      <h4>Now using</h4>
      <div className="skills-grid">
        {skillsData.using.map((sk) => (
          <div key={sk.id} className="skill-item">
            <sk.icon className="skill-icon" />
            <span>{sk.txt}</span>
          </div>
        ))}
      </div>
      
      <h4>Currently Learning</h4>
      <div className="skills-grid">
        {skillsData.learning.map((sk) => (
          <div key={sk.id} className="skill-item">
            <sk.icon className="skill-icon" />
            <span>{sk.txt}</span>
          </div>
        ))}
      </div>
      
      <h4>Other Technologies</h4>
      <div className="skills-grid">
        {skillsData.others.map((sk) => (
          <div key={sk.id} className="skill-item">
            <sk.icon className="skill-icon" />
            <span>{sk.txt}</span>
          </div>
        ))}
      </div>
    </div>
    </>
  );

  return (
    <Projects 
      sectionCon="skills-section"
      header="header"
      title="Skills"
      children={skillsContent}
      sectionId="skills"
    />
  );
}