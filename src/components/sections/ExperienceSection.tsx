import '../../styles/components/ExperienceSection.scss';

const experiences = [
  {
    company: 'Intuivo OÜ',
    role: 'Frontend Engineer',
    period: 'Sep 2025 - Mar 2026',
    description: 'Building responsive frontend applications with React, Next.js, Svelte, and TypeScript'
  },
  {
    company: 'theSOFTtribe Ltd',
    role: 'Frontend Developer',
    period: 'Mar 2022 - Jul 2023',
    description: 'Developed user-focused web applications using modern frontend technologies'
  }
];

export function ExperienceSection() {
  return (
    <section className="experience" data-section="experience">
      <div className="experience-container">
        <div className="experience-header">
          <h2>/EXPERIENCE</h2>
          <span className="experience-badge">2-3 years</span>
        </div>

        <div className="experience-stage">
          <div className="experience-list">
            {experiences.map((exp) => (
              <div key={exp.company} className="experience-item">
                <div className="experience-info">
                  <h3 className="company-name">{exp.company}</h3>
                  <p className="job-role">{exp.role}</p>
                  <p className="job-description">{exp.description}</p>
                </div>
                <div className="experience-period">{exp.period}</div>
              </div>
            ))}
          </div>
          <div className="experience-doors" aria-hidden="true">
            <div className="experience-door experience-door--left" />
            <div className="experience-door experience-door--right" />
          </div>
        </div>
      </div>
    </section>
  );
}
