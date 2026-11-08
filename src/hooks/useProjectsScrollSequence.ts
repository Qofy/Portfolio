import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useProjectsScrollSequence = () => {
  useEffect(() => {
    const projectsSection = document.querySelector('.projects') as HTMLElement;
    const projectsHeader = document.querySelector('.projects-header h2') as HTMLElement;

    if (!projectsSection || !projectsHeader) return;

    // Position Projects below viewport initially
    gsap.set(projectsSection, { y: window.innerHeight });

    const initialFontSize = parseFloat(
      window.getComputedStyle(projectsHeader).fontSize
    );

    const pinDuration = window.innerHeight * 5;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsSection,
        start: 'top top',
        end: `+=${pinDuration}`,
        pin: true,
        scrub: 1,
        markers: false,
      },
    });

    // Phase 1: Slide Projects section up into viewport
    tl.to(
      projectsSection,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      },
      0
    );

    // Phase 2: Scale projects title up
    tl.to(
      projectsHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0.1
    );

    // Phase 3: Fade in projects content
    tl.to(
      '.projects-grid',
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
        if (trigger.vars.trigger === projectsSection) {
          trigger.kill();
        }
      });
    };
  }, []);
};
