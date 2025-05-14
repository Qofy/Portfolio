import {NavLink } from 'react-router-dom';
import"../styles/nav.scss"

export function Nav (){
  return(
    <nav className='nav'>
    <div className="logo">
      Kofi Safo Agyekum
    </div>
    <ul>
      <li className='nav_links'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="service">Service</NavLink>
        <NavLink to="resume">Resume</NavLink>
        <NavLink to="skills">Skills</NavLink>
        <NavLink to="projects">Projects</NavLink>
        <NavLink to="contact">Contact</NavLink>
        <NavLink to="hireme">Hire Me</NavLink>              
      </li>
    </ul>
  </nav>
  )
}