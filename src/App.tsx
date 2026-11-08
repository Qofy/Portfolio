import './styles/globals.scss';
import { Navigation, ScrollProgressBar, HeroSection, AboutSection, SkillsSection, BackgroundSection, ExperienceSection, ProjectsSection, BlogSection } from './components';
import { useHeroScrollSequence } from './hooks';

export default function App() {
  // Initialize hero scroll sequence animation
  useHeroScrollSequence();

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
