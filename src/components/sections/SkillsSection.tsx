import '../../styles/components/SkillsSection.scss';
import { useEffect, useRef } from 'react';

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 
      'TypeScript', 'Tailwind CSS', 'SCSS', 
      'HTML/CSS', 
      'React Query', 'Axios', 'Redux', 'Formik']
  },
  {
    category: 'Backend',
    skills: [ 'Django', 'Python', 'Django Fullstack', 'REST APIs']
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'Firebase', 'Prisma', 'SQL', 'Neon']
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'AWS', 'Docker', 'Vercel',]
  },
  {
    category: 'AI & Productivity',
    skills: ['Claude', 'GitHub Copilot', 'ChatGPT',]
  }
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const groups = sectionRef.current?.querySelectorAll('.skill-group');
            groups?.forEach((group) => {
              group.classList.add('animate');
            });
          } else {
            const groups = sectionRef.current?.querySelectorAll('.skill-group');
            groups?.forEach((group) => {
              group.classList.remove('animate');
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <section className="skills" data-section="skills" ref={sectionRef}>
      <div className="skills-container">
        <div className="skills-header">
          <h2>/SKILLS & STACKS</h2>
          <p className="skills-subtitle">Technologies I work with</p>
        </div>

        <div className="skills-grid">
          {skillsData.map((skillGroup, index) => {
            let animationClass = '';
            if (index % 4 === 0) animationClass = 'animate-from-left';
            else if (index % 4 === 1) animationClass = 'animate-from-top';
            else if (index % 4 === 2) animationClass = 'animate-from-right';
            else animationClass = 'animate-from-bottom';

            return (
              <div key={index} className={`skill-group ${animationClass}`}>
                <h3 className="skill-category">{skillGroup.category}</h3>
                <div className="skill-list">
                  {skillGroup.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
