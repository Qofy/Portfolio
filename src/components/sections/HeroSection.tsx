import '../../styles/components/HeroSection.scss';
import { SectionMesh } from '../common/SectionMesh';
import { Github, Linkedin, Mail, Contact } from 'lucide-react';
import profileImg from '../../images/profile2.png';
import { useEffect, useRef } from 'react';
import { useScrollTrigger } from '../../hooks';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Qofy' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/kofi-agyekum-870569298/' },
  { icon: Mail, label: 'Gmail', href: 'mailto:safokofi888@gmail.com' },
  { icon: Contact, label: 'Contact', href: 'tel:+4917647089256' },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { createParallax, createStaggerReveal } = useScrollTrigger();

  useEffect(() => {
    // Parallax effect on hero image
    const heroImage = sectionRef.current?.querySelector('.hero-image') as HTMLElement;
    if (heroImage) {
      createParallax(heroImage, 80);
    }

    // Parallax effect on hero content
    const heroLeft = sectionRef.current?.querySelector('.hero-left') as HTMLElement;
    if (heroLeft) {
      createParallax(heroLeft, -40);
    }

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
  }, [createParallax, createStaggerReveal]);

  return (
    <section className="hero" data-section="hero" ref={sectionRef}>
      <SectionMesh />
      <div className="hero-container">
        <div className="hero-name-bg">
          <h1 className="hero-name">
            KOFI <span className="hero-name-accent">AGYEKUM</span>
          </h1>
        </div>

        <div className="hero-left">
          <h2 className="hero-title">Frontend Engineer</h2>
          <p className="hero-bio">
            I'm Kofi Safo Agyekum — a Frontend Engineer specializing in React, Next.js,
            and modern web development. I build responsive,
            user-focused web applications with clean code,
            scalable architectures, and exceptional user experiences.
          </p>
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
