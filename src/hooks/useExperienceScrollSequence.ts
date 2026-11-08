import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useExperienceScrollSequence = () => {
  useEffect(() => {
    const experienceSection = document.querySelector('.experience') as HTMLElement;
    const experienceHeader = document.querySelector('.experience-header h2') as HTMLElement;

    if (!experienceSection || !experienceHeader) return;

    // Position Experience below viewport initially
    gsap.set(experienceSection, { y: window.innerHeight });

    const initialFontSize = parseFloat(
      window.getComputedStyle(experienceHeader).fontSize
    );

    // Pin Experience section to show FULL CONTENT - like About section
    const expContent = experienceSection.querySelector('.experience-timeline') as HTMLElement;
    const expContentHeight = expContent?.offsetHeight || window.innerHeight;
    // Minimum 12 screen heights OR 2x content height - whichever is larger
    const pinDuration = Math.max(window.innerHeight * 12, expContentHeight * 2);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: experienceSection,
        start: 'top top',
        end: `+=${pinDuration}`,
        pin: true,
        scrub: 1,
        markers: false,
      },
    });

    // Phase 1: Slide Experience section up into viewport
    tl.to(
      experienceSection,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      },
      0
    );

    // Phase 2: Scale experience title up
    tl.to(
      experienceHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0.1
    );

    // Phase 3: Fade in experience content
    tl.to(
      '.experience-timeline',
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
        if (trigger.vars.trigger === experienceSection) {
          trigger.kill();
        }
      });
    };
  }, []);
};
