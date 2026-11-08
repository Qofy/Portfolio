import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useBackgroundScrollSequence = () => {
  useEffect(() => {
    const backgroundSection = document.querySelector('.background') as HTMLElement;
    const backgroundHeader = document.querySelector('.background-header h2') as HTMLElement;

    if (!backgroundSection || !backgroundHeader) return;

    // Position Background below viewport initially
    gsap.set(backgroundSection, { y: window.innerHeight });

    const initialFontSize = parseFloat(
      window.getComputedStyle(backgroundHeader).fontSize
    );

    const pinDuration = window.innerHeight * 5;

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

    // Phase 1: Slide Background section up into viewport
    tl.to(
      backgroundSection,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      },
      0
    );

    // Phase 2: Scale background title up
    tl.to(
      backgroundHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0.1
    );

    // Phase 3: Fade in background content
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
