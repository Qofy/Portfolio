import './styles/globals.scss';
import { Navigation, ScrollProgressBar, HeroSection, AboutSection, SkillsSection, BackgroundSection, ExperienceSection, ProjectsSection, BlogSection } from './components';
import { useHeroScrollSequence, useAboutScrollSequence, useSkillsScrollSequence } from './hooks';

export default function App() {
  // Hero scroll sequence: name scales up as you scroll
  useHeroScrollSequence();

  // About scroll sequence: pins and takes control before Skills appears
  useAboutScrollSequence();

  // Skills scroll sequence: pins and takes control after About is done
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
