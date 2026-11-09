import '../../styles/components/Navigation.scss';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChatBox } from './ChatBox';
import { ThemeLamp } from './ThemeLamp';
import { getSectionAnchor } from '../../utils/sectionAnchor';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Stacks', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Background', href: '#background' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#hero' },
];

function findSection(id: string) {
  return document.querySelector<HTMLElement>(`section[data-section="${CSS.escape(id)}"]`);
}

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Resolve deep links after ScrollTrigger has wrapped the pinned sections.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const pathname = window.location.pathname.split('/').filter(Boolean)[0] || '';
    const section = findSection(hash || pathname);
    if (!hash) window.history.replaceState(null, '', `#${section ? pathname : 'hero'}`);
    if (!section) return;

    const initialScroll = window.requestAnimationFrame(() => {
      getSectionAnchor(section).scrollIntoView({ behavior: 'instant' });
    });
    return () => window.cancelAnimationFrame(initialScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[data-section]');
      let current = '';

      sections.forEach((section) => {
        if (getSectionAnchor(section).getBoundingClientRect().top <= 200) {
          current = section.dataset.section || '';
        }
      });

      setActiveSection(current);

      // Update URL hash when scrolling
      if (current && current !== window.location.hash.replace('#', '')) {
        window.history.replaceState(null, '', `#${current}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle browser back and forward.
  useEffect(() => {
    const handleHashChange = () => {
      const section = findSection(window.location.hash.slice(1));
      if (section) getSectionAnchor(section).scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSmoothScroll = (href: string) => {
    const section = findSection(href.slice(1));
    if (section) {
      getSectionAnchor(section).scrollIntoView({ behavior: 'smooth' });
      // Update URL hash when clicking navigation
      window.history.pushState(null, '', href);
      // Close mobile menu after navigation
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-left">
          <span className="available-badge">
            <span className="dot"></span>
            Available for New Project
          </span>
        </div>

        <div className="nav-center">
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(link.href);
                  }}
                  className={activeSection === link.href.replace('#', '') ? 'active' : ''}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-right">
          <ThemeLamp />
          <button
            className="cta-button"
            onClick={() => setChatOpen(true)}
          >
            Let's Talk <ArrowUpRight size={18} />
          </button>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-menu">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(link.href);
                  }}
                  className={activeSection === link.href.replace('#', '') ? 'active' : ''}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </nav>
  );
}
