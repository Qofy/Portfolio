import { SectionContainer } from "../sub-components/SectionContainer"
import "../styles/component/skills.scss"
import { skillsData } from "../data/skillsData"
import GH1 from "../img/GH1.png"
import German from "../img/Germany-Flag.jpg"
import UK from "../img/uk-sphere-01.png"

export function Skills() {
  const skillContent = (
    <section id="skills" className="section-main__container">
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
        
       {skillsData.using.map((data) => (
          <div className="skill-item" key={data.id}>
            <data.icon className="skill-icon" />
            <span>{data.txt}</span>
          </div>
       ))}        
      </div>
      
      <h4>
        Learning:
      </h4>
      <div className="skills-grid">
        {skillsData.learning.map((data) => (
          <div className="skill-item" key={data.id}>
            <data.icon className="skill-icon" />
            <span>{data.txt}</span>
          </div>
        ))}
      </div>

      <h4>
        Other Skills:
      </h4>
      <div className="skills-grid">
        {skillsData.others.map((data) => (
          <div className="skill-item" key={data.id}>
            <data.icon className="skill-icon" />
            <span>{data.txt}</span>
          </div>
        ))}
      </div>

      <h4>
        Languages:
        <div className="languages">
          <div className="lng">
            <img className="lng-flag" src={UK} alt="uk-flag" />
          <h3>English &#45; <em className="special-2">Good</em></h3>

          </div>
          <div className="lng">
            <img className="lng-flag" src={German} alt="german-flag" />
          <h3>German &#45; <em className="special-2">A2</em></h3>

          </div>
          <div className="lng">
            <img className="lng-flag" src={GH1} alt="ghana" />
          <h3>Twi &#45; <em className="special-2">Mother Language</em></h3>

          </div>
        </div>
      </h4>
     
    </div>
  )
}