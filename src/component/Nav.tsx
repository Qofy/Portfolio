import { Link } from 'react-scroll';
// import { Download } from 'lucide-react';
import "../styles/component/nav.scss";

type NavProps = {
  nav?: string;
};

const NAV_LINKS = [
  { to: 'contact',    label: 'Contact Me'  },
  { to: 'about',      label: 'About'       },
  { to: 'skills',     label: 'Skills'      },
  { to: 'projects',   label: 'Projects'    },
  { to: 'background', label: 'Background'  },
];

const LINK_DEFAULTS = {
  spy: true,
  smooth: true,
  duration: 500,
  offset: -80,
  activeClass: 'active',
  className: 'link',
} as const;

export function Nav({ nav = 'nav' }: NavProps) {
  return (
    <nav className={nav}>
      <ul>
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} {...LINK_DEFAULTS}>
              {label}
            </Link>
          </li>
        ))}
        {/* <li className="resume-item">
          <a
            href="/Kofi_Safo_Agyekum_CV.pdf"
            download
            className="resume-link"
            aria-label="Download resume"
          >
            <Download size={18} />
            <span>Resume</span>
          </a>
        </li> */}
      </ul>
    </nav>
  );
}
