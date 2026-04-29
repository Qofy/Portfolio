// import { SectionContainer } from "../sub-components/SectionContainer"
import "../styles/component/skills.scss"
import { skillsData } from "../data/skillsData"
import { Projects } from "./Projects"

export function Skills() {
  const skillsContent = (
    <div className="skills-main">
      {skillsData.title && <h3 className="skills-title">{skillsData.title}</h3>}
      {skillsData.categories.map((cat, idx) => (
        <section key={cat.name + idx} className="skills-category">
          <h4>{cat.name}</h4>
          <div className="skills-grid">
            {cat.items.map((item, i) => (
              <div key={item + i} className="skill-item">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
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