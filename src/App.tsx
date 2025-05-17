import { Nav } from './component/Nav';
import { Home } from './component/Home';
import { About } from './component/About';
import { Service } from './component/Service';
import { Resume } from './component/Resume';
import { Skills } from './component/Skill';
import { Projects } from './component/Projects';
import { Contact } from './component/Contact';
import { HireMe } from './component/HireMe';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="service">
          <Service />
        </section>
        <section id="resume">
          <Resume />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <section id="hireme">
          <HireMe />
        </section>
      </main>
    </>
  );
}

export default App;
