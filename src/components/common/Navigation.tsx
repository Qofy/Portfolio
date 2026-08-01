import '../../styles/components/Navigation.scss';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Stacks', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Background', href: '#background' },
  { label: 'Contact', href: '#hero' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (href: string) => {
    const id = href.replace('#', '');
    const element = document.querySelector(`[data-section="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
          <button className="cta-button">
            Let's Talk <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
