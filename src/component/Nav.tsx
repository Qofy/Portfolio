import { HashLink } from 'react-router-hash-link';
import { useState, useEffect } from 'react';
import "../styles/component/nav.scss";

export function Nav() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className='nav'>
      <div className="logo">
        <em className='spc-cha'>K</em>ofi Safo <em className='spc-cha'>A</em>gyekum
      </div>
      <ul>
        <li>
          <HashLink smooth className={activeSection === 'home' ? 'link active' : 'link'} to="#home">Home</HashLink>
          <HashLink smooth className={activeSection === 'about' ? 'link active' : 'link'} to="#about">About</HashLink>
          <HashLink smooth className={activeSection === 'service' ? 'link active' : 'link'} to="#service">Service</HashLink>
          <HashLink smooth className={activeSection === 'resume' ? 'link active' : 'link'} to="#resume">Resume</HashLink>
          <HashLink smooth className={activeSection === 'skills' ? 'link active' : 'link'} to="#skills">Skills</HashLink>
          <HashLink smooth className={activeSection === 'projects' ? 'link active' : 'link'} to="#projects">Projects</HashLink>
          <HashLink smooth className={activeSection === 'contact' ? 'link active' : 'link'} to="#contact">Contact</HashLink>
          <button className='btn-1'>
            <HashLink smooth className= 'link' to="#hireme">Hire Me</HashLink>
          </button>
        </li>
      </ul>
    </nav>
  );
}