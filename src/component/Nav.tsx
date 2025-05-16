import {NavLink } from 'react-router-dom';
import "../styles/component/nav.scss"

export function Nav (){
  return(
    <nav className='nav'>
    <div className="logo">
     <em className='spc-cha'>K</em> ofi Safo <em className='spc-cha'>A</em>gyekum
    </div>
    <ul>
      <li>
        <NavLink className={({isActive}) => isActive ? "link active": "link"} to="/">Home</NavLink>
        <NavLink className={({isActive}) => isActive ? "link active": "link"} to="about">About</NavLink>
        <NavLink className={({isActive}) => isActive ? "link active": "link"} to="service">Service</NavLink>   
        <NavLink className={({isActive}) => isActive ? "link active": "link"} to="resume">Resume</NavLink>    
        <NavLink className={({isActive}) => isActive ? "link active": "link"} to="skills">Skills</NavLink>
        <NavLink className={({isActive}) => isActive ? "link active": "link"} to="projects">Projects</NavLink>
        <NavLink className={({isActive}) => isActive ? "link active": "link"} to="contact">Contact</NavLink>
        <button className='btn-1'>
        <NavLink className={({isActive}) => isActive ? "link active": "link"} to="hireme">Hire Me</NavLink>              
        </button>
            
      </li>
    </ul>
  </nav>
  )
}