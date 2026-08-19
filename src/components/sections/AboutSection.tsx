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
              I'm a Software Engineer with 2-3 years of hands-on experience building web applications people actually use. React, Next.js, TypeScript, and Node.js are my everyday tools — I take ownership from first component to production deployment, use Claude and Copilot to ship faster, and never cut corners on quality.
            </p>

            <p>
              I approach every project with a focus on clean architecture, maintainable code, and user-first design. Whether building scalable frontend systems or robust backend services, I'm committed to delivering solutions that work reliably at scale and empower teams to move faster.
            </p>

            <p>
              Beyond code, I'm driven by continuous learning, collaborative problem-solving, and a genuine passion for building products that matter. I thrive in environments where technical excellence and business impact go hand-in-hand.
            </p>

            <p className="focus-intro">
              My toolkit includes:
            </p>
            <ul className="focus-list">
              <li>React & Next.js for building scalable frontend applications</li>
              <li>TypeScript for clean, maintainable code</li>
              <li>Django for robust backend services</li>
              <li>AI-assisted development with Claude and Copilot</li>
              <li>Production deployment and system architecture</li>
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
