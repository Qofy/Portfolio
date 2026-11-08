import './styles/globals.scss';
import { Navigation, ScrollProgressBar, HeroSection, AboutSection, SkillsSection, BackgroundSection, ExperienceSection, ProjectsSection, BlogSection } from './components';
import { useSectionScrollReveal } from './hooks';

export default function App() {
  // Initialize progressive content reveal for all sections
  useSectionScrollReveal();

  return (
    <>
      <ScrollProgressBar />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <BackgroundSection />
        <ExperienceSection />
        <ProjectsSection />
        <BlogSection />
      </main>
    </>
  );
}
