import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSkillsScrollSequence = () => {
  useEffect(() => {
    const skillsSection = document.querySelector('.skills') as HTMLElement;
    const skillsHeader = document.querySelector('.skills-header h2') as HTMLElement;

    if (!skillsSection || !skillsHeader) return;

    // Position Skills below viewport initially (like About does)
    gsap.set(skillsSection, { y: window.innerHeight });

    // Get initial font size of skills header
    const initialFontSize = parseFloat(
      window.getComputedStyle(skillsHeader).fontSize
    );

    // Pin Skills section to show FULL CONTENT - like About section
    const skillsContent = skillsSection.querySelector('.skills-grid') as HTMLElement;
    const skillsContentHeight = skillsContent?.offsetHeight || window.innerHeight;
    // Minimum 12 screen heights OR 2x content height - whichever is larger
    const pinDuration = Math.max(window.innerHeight * 12, skillsContentHeight * 2);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsSection,
        start: 'top top',
        end: `+=${pinDuration}`,
        pin: true,
        scrub: 1,
        markers: false,
      },
    });

    // Phase 1: Slide Skills section up into viewport
    tl.to(
      skillsSection,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      },
      0
    );

    // Phase 2: Scale skills title up
    tl.to(
      skillsHeader,
      {
        fontSize: initialFontSize * 2,
        opacity: 1,
        duration: 1,
      },
      0.1
    );

    // Phase 3: Fade in skills content
    tl.to(
      '.skills-grid',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.3
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === skillsSection) {
          trigger.kill();
        }
      });
    };
  }, []);
};
