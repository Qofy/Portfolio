import { Nav } from './component/Nav';
import { About } from './component/About';
// import { Resume } from './component/Resume';
import { Skills } from './component/Skill';
import { Projects } from './component/Projects';
import { Contact } from './component/Contact';
import './App.css';

function App() {
  return (
    <>
      <Nav nav='nav'/>
      <main>
      <section id="contact">
          <Contact />
        </section>
        <section id="about">
          <About>
          </About>
        </section>
        {/* <section id="resume">
          <Resume />
        </section> */}
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
       
        
      </main>
    </>
  );
}

export default App;
