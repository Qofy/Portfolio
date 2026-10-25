import '../../styles/components/AboutSection.scss';
import { useEffect, useRef } from 'react';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const aboutText = sectionRef.current?.querySelector('.about-text');
            const aboutStats = sectionRef.current?.querySelector('.about-stats');

            aboutText?.classList.add('animate');
            aboutStats?.classList.add('animate');
          } else {
            const aboutText = sectionRef.current?.querySelector('.about-text');
            const aboutStats = sectionRef.current?.querySelector('.about-stats');

            aboutText?.classList.remove('animate');
            aboutStats?.classList.remove('animate');
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
    <section className="about" data-section="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-header">
          <h2>About Me</h2>
          <div className="header-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a Frontend Engineer with 2-3 years of hands-on experience building user-focused web applications. React, Next.js, and TypeScript are my core tools — I own the entire frontend journey from design to production, create responsive interfaces that delight users, and use AI tools to ship faster without compromising quality.
            </p>

            <p>
              I approach every project with a focus on clean code, scalable architecture, and exceptional user experiences. My philosophy centers on building performant, accessible interfaces that users love and developers maintain easily. I'm committed to delivering solutions that work reliably across all devices and browsers.
            </p>

            <p>
              Beyond code, I'm driven by continuous learning, collaborative problem-solving, and a passion for creating digital products that truly matter. I thrive in environments where technical excellence and user satisfaction go hand-in-hand.
            </p>

            <p className="focus-intro">
              My toolkit includes:
            </p>
            <ul className="focus-list">
              <li>React & Next.js for scalable, modern frontend applications</li>
              <li>TypeScript for robust, type-safe code</li>
              <li>Responsive design and CSS mastery</li>
              <li>State management with Redux and Context</li>
              <li>AI-assisted development with Claude and Copilot</li>
            </ul>
          </div>

          <div className="about-stats">
            <div className="stat">
              <div className="stat-number">2-3</div>
              <div className="stat-label">Years of Experience</div>
            </div>
            <div className="stat">
              <div className="stat-number">20+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat">
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
