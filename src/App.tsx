// import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import { Home } from './component/Home'
import { About } from './component/About'
import { Service } from './component/Service'
import { Resume } from './component/Resume'
import { Skills } from './component/Skill'
import { Projects } from './component/Projects'
import { Contact } from './component/Contact'
import { HireMe } from './component/HireMe'
import { Nav } from './component/Nav'
import './App.css'

function App() {

  return (
    <>
 
      <Nav/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='service' element={<Service/>}/>
      <Route path='resume' element={<Resume/>}/>
      <Route path='skills' element={<Skills/>}/>
      <Route path='projects' element={<Projects/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='hireme' element={<HireMe/>}/>
     </Routes>
    </>
  )
}

export default App
