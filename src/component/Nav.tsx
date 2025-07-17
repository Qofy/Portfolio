import { Link } from 'react-scroll';
import "../styles/component/nav.scss";

type NavProps = {
  nav: string
}

export function Nav({ nav }: NavProps) {
  return (
    <nav className={nav}>
      <ul>
        <li>
          <Link 
            to="contact"
            spy={true}
            smooth={true} 
            duration={500}
            offset={-80}
            activeClass="active"
            className="link"
          >
            Contact Me
          </Link>
        </li>
        <li>
          <Link 
            to="about"
            spy={true}
            smooth={true} 
            duration={500}
            offset={-80}
            activeClass="active"
            className="link"
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="skills"
            spy={true}
            smooth={true} 
            duration={500}
            offset={-80}
            activeClass="active"
            className="link"
          >
            Skills
          </Link>
        </li>
        
        <li>
          <Link 
            to="projects"
            spy={true}
            smooth={true} 
            duration={500}
            offset={-80}
            activeClass="active"
            className="link"
          >
            Projects
          </Link>
        </li>
        
        <li>
          <Link 
            to="background"
            spy={true}
            smooth={true} 
            duration={500}
            offset={-80}
            activeClass="active"
            className="link"
          >
            Backgroung
          </Link>
        </li>
      </ul>
    </nav>
  );
}
