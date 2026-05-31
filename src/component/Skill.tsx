import "../styles/component/skills.scss";
import { skillsData } from "../data/skillsData";

export function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <header className="skills-header">
          <h1 className="header">Skills</h1>
          {/* <p className="skills-subtitle">Technologies and tools I work with</p> */}
        </header>

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
      </div>
    </section>
  );
}
