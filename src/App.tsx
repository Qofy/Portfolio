import './styles/globals.scss';
import { Navigation, HeroSection, AboutSection, SkillsSection, BackgroundSection, ExperienceSection, ProjectsSection } from './components';

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <BackgroundSection />
        <ExperienceSection />
        <ProjectsSection />
      </main>
    </>
  );
}
