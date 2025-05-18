import { HashLink } from 'react-router-hash-link';
import { useState, useEffect } from 'react';
import "../styles/component/nav.scss";

type NavProps = {
  nav:string
}
export function Nav({nav}:NavProps) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Improved calculation to determine active section
        if (window.scrollY >= sectionTop - 200 && 
            window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    // Initial call to set active section on page load
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={nav}>
      <ul>
        <li>
          <HashLink smooth className={activeSection === 'about' ? 'link active' : 'link'} to="#about">About</HashLink>
          <HashLink smooth className={activeSection === 'skills' ? 'link active' : 'link'} to="#skills">Skills</HashLink>
          <HashLink smooth className={activeSection === 'projects' ? 'link active' : 'link'} to="#projects">Projects</HashLink>
          <HashLink smooth className={activeSection === 'contact' ? 'link active' : 'link'} to="#contact">Contact Me</HashLink>
        </li>
      </ul>
    </nav>
  );
}
