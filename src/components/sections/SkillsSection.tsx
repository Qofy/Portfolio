import '../../styles/components/SkillsSection.scss';
import { SectionMesh } from '../common/SectionMesh';

const skillsData = [
  {
    category: 'Frontend',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'SCSS',
      'HTML/CSS',
      'TanStack Query',
      'React Query',
      'Redux Toolkit',
      'Shadcn/UI',
      'Axios',
      'Formik'
    ]
  },
  {
    category: 'Data & APIs',
    skills: [
      'REST APIs',
      'GraphQL',
      'Firebase',
      'Firestore',
      'Real-time Databases',
      'Data Fetching & Caching'
    ]
  },
  {
    category: 'Testing & Quality',
    skills: [
      'Cypress',
      'Jest',
      'Unit Testing',
      'Integration Testing'
    ]
  },
  {
    category: 'Tools & Platforms',
    skills: [
      'Git',
      'GitHub',
      'GitLab',
      'VS Code',
      'Docker',
      'CI/CD',
      'Vercel',
      'Fly.io',
      'AWS',
      'AWS S3',
      'npm',
      'pnpm',
      'bun',
      'Jira'
    ]
  },
  {
    category: 'AI & Productivity',
    skills: [
      'Claude',
      'GitHub Copilot',
      'ChatGPT',
      'Ollama',
      'AI Integration'
    ]
  }
];

export function SkillsSection() {
  return (
    <section className="skills" data-section="skills">
      <SectionMesh />
      <div className="skills-container">
        <div className="skills-header">
          <h2>/SKILLS & STACKS</h2>
          <p className="skills-subtitle">Technologies I work with</p>
        </div>

        <div className="skills-grid">
          {skillsData.map((skillGroup) => (
            <div key={skillGroup.category} className="skill-group">
              <h3 className="skill-category">{skillGroup.category}</h3>
              <div className="skill-list">
                {skillGroup.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
