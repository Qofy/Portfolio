import '../../styles/components/HeroSection.scss';
import { ArrowUpRight, Github, Linkedin, Mail, Contact } from 'lucide-react';
import profileImg from '../../images/profile2.jpeg';
import { useEffect, useRef } from 'react';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Qofy' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/kofi-agyekum-870569298/' },
  { icon: Mail, label: 'Gmail', href: 'mailto:safokofi888@gmail.com' },
  { icon: Contact, label: 'Contact', href: 'tel:+4917647089256' },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const heroLeft = sectionRef.current?.querySelector('.hero-left');
            const heroCenter = sectionRef.current?.querySelector('.hero-center');
            const heroRight = sectionRef.current?.querySelector('.hero-right');
            const heroNameBg = sectionRef.current?.querySelector('.hero-name-bg');

            heroLeft?.classList.add('animate');
            heroCenter?.classList.add('animate');
            heroRight?.classList.add('animate');
            heroNameBg?.classList.add('animate');
          } else {
            const heroLeft = sectionRef.current?.querySelector('.hero-left');
            const heroCenter = sectionRef.current?.querySelector('.hero-center');
            const heroRight = sectionRef.current?.querySelector('.hero-right');
            const heroNameBg = sectionRef.current?.querySelector('.hero-name-bg');

            heroLeft?.classList.remove('animate');
            heroCenter?.classList.remove('animate');
            heroRight?.classList.remove('animate');
            heroNameBg?.classList.remove('animate');
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
    <section className="hero" data-section="hero" ref={sectionRef}>
      <div className="hero-container">
        <div className="hero-name-bg">
          <h1 className="hero-name">
            KOFI <span className="hero-name-accent">AGYEKUM</span>
          </h1>
        </div>

        <div className="hero-left">
          <h2 className="hero-title">Software Engineer</h2>
          <p className="hero-bio">
            I'm Kofi Safo Agyekum — a Software Engineer specializing in React, Next.js, 
            and modern web development. I build production-ready 
            web applications with clean architectures, 
            maintainable code, and user-first design, django fullstack and Express.
          </p>
          <button className="hero-cta">
            Let's collaborate <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="hero-center">
          <div className="hero-image">
            <img src={profileImg} alt="Kofi Agyekum" />
          </div>
        </div>

        <div className="hero-right">
          <div className="social-links">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-item"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
