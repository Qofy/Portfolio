import '../../styles/components/Hero.scss';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import BinaryRain from './BinaryRain';
import FloatingImage from './FloatingImage';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Qofy' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/kofi-agyekum-870569298/' },
  { icon: Mail, label: 'Email', href: 'mailto:safokofi888@gmail.com' },
];

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const handleScroll = (sectionId: string) => {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="hero-section"
      data-section="hero"
      ref={contentRef}
    >
      {/* Binary Rain Canvas - Bottom Layer */}
      <BinaryRain />

      {/* Floating Profile Image */}
      <FloatingImage />

      {/* Main Content - Top Layer */}
      <div className={`hero-content ${isVisible ? 'animate-in' : ''}`}>
        <div className="hero-text">
          {/* Small Label */}
          <p className="hero-label">Frontend Developer · Hamburg, Germany</p>

          {/* Main Heading */}
          <h1 className="hero-title">
            Kofi
            <span className="title-accent">Agyekum</span>
          </h1>

          {/* Subheading */}
          <p className="hero-subtitle">
            Building responsive, user-focused web applications with React, Next.js, and TypeScript
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button
              onClick={() => handleScroll('projects')}
              className="btn btn-primary"
              aria-label="View my projects"
            >
              View Projects
              <ArrowUpRight size={18} />
            </button>
            <button
              onClick={() => handleScroll('contact')}
              className="btn btn-secondary"
              aria-label="Contact me"
            >
              Contact Me
            </button>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
