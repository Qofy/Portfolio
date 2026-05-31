import { Nav } from './component/Nav';
import { About } from './component/About';
import { Skills } from './component/Skill';
import { Projects } from './component/Projects';
import { Contact } from './component/Contact';
import { AboutBackground } from './component/AboutBackground';
import { ChatbotButton } from './sub-components/ChatbotButton';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Contact />
        <About />
        <Skills />
        <Projects />
        <AboutBackground />
      </main>
      <ChatbotButton />
    </>
  );
}

export default App;
