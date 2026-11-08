import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useBackgroundScrollSequence = () => {
  useEffect(() => {
    const backgroundSection = document.querySelector('.background') as HTMLElement;
    const backgroundHeader = document.querySelector('.background-header h2') as HTMLElement;

    if (!backgroundSection || !backgroundHeader) return;

    const initialFontSize = parseFloat(
      window.getComputedStyle(backgroundHeader).fontSize
    );

    // Pin Background section to show FULL CONTENT - like About section
    const bgContent = backgroundSection.querySelector('.background-timeline') as HTMLElement;
    const bgContentHeight = bgContent?.offsetHeight || window.innerHeight;
    // Minimum 12 screen heights OR 2x content height - whichever is larger
    const pinDuration = Math.max(window.innerHeight * 12, bgContentHeight * 2);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: backgroundSection,
        start: 'top top',
        end: `+=${pinDuration}`,
        pin: true,
        scrub: 1,
        markers: false,
      },
    });

    // Scale the title once Background scrolls into place.
    tl.to(
      backgroundHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0.1
    );

    // Fade in the background content.
    tl.to(
      '.background-timeline',
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
        if (trigger.vars.trigger === backgroundSection) {
          trigger.kill();
        }
      });
    };
  }, []);
};
