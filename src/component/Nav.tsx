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
            to="about"
            spy={true}
            smooth={true} 
            duration={500}
            offset={-62}
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
            offset={-62}
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
            offset={-100}
            activeClass="active"
            className="link"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link 
            to="contact"
            spy={true}
            smooth={true} 
            duration={500}
            offset={-100}
            activeClass="active"
            className="link"
          >
            Contact Me
          </Link>
        </li>
      </ul>
    </nav>
  );
}
