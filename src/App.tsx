import './styles/globals.scss';
import { Navigation, ScrollProgressBar, HeroSection, AboutSection, SkillsSection, BackgroundSection, ExperienceSection, ProjectsSection, BlogSection } from './components';
import { useHeroScrollSequence, useSkillsScrollSequence } from './hooks';

export default function App() {
  // Hero scroll sequence: name scales up as you scroll
  useHeroScrollSequence();

  // Skills scroll sequence: title scales up as you scroll into Skills
  useSkillsScrollSequence();

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
