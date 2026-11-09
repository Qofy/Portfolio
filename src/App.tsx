import './styles/globals.scss';
import { useSectionSlideHandoffs } from './hooks/useSectionSlideHandoffs';
import { Navigation, ScrollProgressBar, HeroSection, AboutSection, SkillsSection, BackgroundSection, ExperienceSection, ProjectsSection, BlogSection } from './components';
import {
  useHeroScrollSequence,
  useAboutScrollSequence,
  useSkillsScrollSequence,
  useBackgroundScrollSequence,
  useExperienceScrollSequence,
} from './hooks';

export default function App() {
  // Cinematic scroll sequences for all sections
  useHeroScrollSequence();
  useAboutScrollSequence();
  useSkillsScrollSequence();
  useBackgroundScrollSequence();
  useExperienceScrollSequence();
  useSectionSlideHandoffs();

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
