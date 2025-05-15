import {NavLink } from 'react-router-dom';
import"../styles/nav.scss"

export function Nav (){
  return(
    <nav className='nav'>
    <div className="logo">
     <em className='spc-cha'>K</em> ofi Safo <em className='spc-cha'>A</em>gyekum
    </div>
    <ul>
      <li>
        <NavLink className="link" to="/">Home</NavLink>
        <NavLink className="link" to="about">About</NavLink>
        <NavLink className="link" to="service">Service</NavLink>   
        <NavLink className="link" to="resume">Resume</NavLink>    
        <NavLink className="link" to="skills">Skills</NavLink>
        <NavLink className="link" to="projects">Projects</NavLink>
        <NavLink className="link" to="contact">Contact</NavLink>
        <button className='btn-1'>
        <NavLink className="link" to="hireme">Hire Me</NavLink>              
        </button>
            
      </li>
    </ul>
  </nav>
  )
}