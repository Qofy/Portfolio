import { Nav } from './component/Nav';
import { About } from './component/About';
import { Skills } from './component/Skill';
import { Projects } from './component/Projects';
import { Contact } from './component/Contact';
import { AboutBackground } from './component/AboutBackground';
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
          <About />
        </section>
        <section id="skills">
          <Skills /> 
        </section>
        <section id="projects">
          <Projects sectionCon='project-main__con' header='p-header' sectionId='projects'/>
        </section>
        <section id="background">
          <AboutBackground />
        </section> 
      </main>
    </>
  );
}

export default App;
