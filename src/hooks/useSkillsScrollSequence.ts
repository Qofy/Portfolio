import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSkillsScrollSequence = () => {
  useEffect(() => {
    const skillsSection = document.querySelector('.skills') as HTMLElement;
    const skillsHeader = document.querySelector('.skills-header h2') as HTMLElement;

    if (!skillsSection || !skillsHeader) return;

    // Get initial font size of skills header
    const initialFontSize = parseFloat(
      window.getComputedStyle(skillsHeader).fontSize
    );

    // Pin Skills section for ~5 screen heights while title animates
    const pinDuration = window.innerHeight * 5;

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

    // Phase 1: Scale skills title up
    tl.to(
      skillsHeader,
      {
        fontSize: initialFontSize * 2,
        opacity: 1,
        duration: 1,
      },
      0
    );

    // Phase 2: Fade in skills content
    tl.to(
      '.skills-grid',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.2
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
