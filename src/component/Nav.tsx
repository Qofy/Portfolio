import { Link } from 'react-scroll';
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
      </ul>
    </nav>
  );
}
