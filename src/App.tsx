import './styles/globals.scss';
import { Navigation, ScrollProgressBar, HeroSection, AboutSection, SkillsSection, BackgroundSection, ExperienceSection, ProjectsSection, BlogSection } from './components';
import {
  useHeroScrollSequence,
  useAboutScrollSequence,
  useSkillsScrollSequence,
  useBackgroundScrollSequence,
  useExperienceScrollSequence,
  useProjectsScrollSequence,
  useBlogScrollSequence,
} from './hooks';

export default function App() {
  // Cinematic scroll sequences for all sections
  useHeroScrollSequence();
  useAboutScrollSequence();
  useSkillsScrollSequence();
  useBackgroundScrollSequence();
  useExperienceScrollSequence();
  useProjectsScrollSequence();
  useBlogScrollSequence();

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
