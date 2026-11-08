import './styles/globals.scss';
import { Navigation, ScrollProgressBar, HeroSection, AboutSection, SkillsSection, BackgroundSection, ExperienceSection, ProjectsSection, BlogSection } from './components';
import { useHeroScrollSequence, useSectionScrollReveal, useLenisScroll } from './hooks';

export default function App() {
  // Initialize smooth scrolling with Lenis
  useLenisScroll();

  // Initialize hero scroll sequence animation
  useHeroScrollSequence();

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
