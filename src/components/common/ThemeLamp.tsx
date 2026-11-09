import { useState } from 'react';
import '../../styles/components/ThemeLamp.scss';

export function ThemeLamp() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');

  const pullCord = () => {
    const theme = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    setDark(theme === 'dark');
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // The lamp still works for the current visit without storage.
    }
  };

  return (
    <button
      type="button"
      className="theme-lamp"
      aria-label="Dark mode"
      aria-pressed={dark}
      title={dark ? 'Pull the cord for light mode' : 'Pull the cord for dark mode'}
      onClick={pullCord}
    >
      <svg viewBox="0 0 44 54" aria-hidden="true" focusable="false">
        <path className="theme-lamp__stem" d="M22 1v9" />
        <ellipse className="theme-lamp__bulb" cx="22" cy="25" rx="6" ry="4" />
        <path className="theme-lamp__shade" d="M21 9h2c6 0 10 5 12 15H9C11 14 15 9 21 9Z" />
        <g className="theme-lamp__cord">
          <path d="M30 24v18" />
          <circle cx="30" cy="45" r="3" />
        </g>
      </svg>
    </button>
  );
}
