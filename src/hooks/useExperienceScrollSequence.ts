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

    const pinDuration = window.innerHeight * 5;

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

    tl.to(
      experienceHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0
    );

    tl.to(
      '.experience-timeline',
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
        if (trigger.vars.trigger === experienceSection) {
          trigger.kill();
        }
      });
    };
  }, []);
};
