import '../../styles/components/ExperienceSection.scss';
import { useEffect, useRef } from 'react';

const experiences = [
  {
    company: 'Intuivo OÜ',
    role: 'Software Engineer',
    period: 'Sep 2025 - Mar 2026',
    description: 'Building innovative digital products with React, Next.js, Svelte, and TypeScript'
  },
  {
    company: 'theSOFTtribe Ltd',
    role: 'Software Developer',
    period: 'Mar 2022 - Jul 2023',
    description: 'Built full-stack applications tailored to client business solutions'
  }
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = sectionRef.current?.querySelectorAll('.experience-item');
            items?.forEach((item) => {
              item.classList.add('animate');
            });
          } else {
            const items = sectionRef.current?.querySelectorAll('.experience-item');
            items?.forEach((item) => {
              item.classList.remove('animate');
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
    <section className="experience" data-section="experience" ref={sectionRef}>
      <div className="experience-container">
        <div className="experience-header">
          <h2>/EXPERIENCE</h2>
          <span className="experience-badge">2+ years</span>
        </div>

        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-item"
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
            >
              <div className="experience-info">
                <h3 className="company-name">{exp.company}</h3>
                <p className="job-role">{exp.role}</p>
                <p className="job-description">{exp.description}</p>
              </div>
              <div className="experience-period">{exp.period}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
