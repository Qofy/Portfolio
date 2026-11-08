import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useExperienceScrollSequence = () => {
  useEffect(() => {
    const experienceSection = document.querySelector('.experience') as HTMLElement;
    const experienceHeader = document.querySelector('.experience-header h2') as HTMLElement;

    if (!experienceSection || !experienceHeader) return;

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

    // Scale the title once Experience scrolls into place.
    tl.to(
      experienceHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0.1
    );

    // Fade in the experience content.
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
