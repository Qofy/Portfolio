import '../../styles/components/Navigation.scss';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChatBox } from './ChatBox';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Stacks', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Background', href: '#background' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#hero' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [chatOpen, setChatOpen] = useState(false);

  // Set hero as default section on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const pathname = window.location.pathname.split('/').filter(Boolean)[0];

    if (hash) {
      // Hash exists, use it
      const element = document.querySelector(`[data-section="${hash}"]`);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else if (pathname) {
      // No hash but pathname exists (e.g., /projects)
      const mappedSection = pathname === 'projects' ? 'projects' : pathname;
      const element = document.querySelector(`[data-section="${mappedSection}"]`);
      if (element) {
        // Update URL to use hash
        window.history.replaceState(null, '', `#${mappedSection}`);
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        // Section not found, default to hero
        window.history.replaceState(null, '', '#hero');
      }
    } else {
      // No hash and no pathname, default to hero
      window.history.replaceState(null, '', '#hero');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('data-section') || '';
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

  // Handle browser back/forward buttons and initial hash load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const element = document.querySelector(`[data-section="${hash}"]`);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      }
    };

    // Handle initial page load with hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSmoothScroll = (href: string) => {
    const id = href.replace('#', '');
    const element = document.querySelector(`[data-section="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update URL hash when clicking navigation
      window.history.pushState(null, '', href);
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
          <button
            className="cta-button"
            onClick={() => setChatOpen(true)}
          >
            Let's Talk <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      <ChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </nav>
  );
}
