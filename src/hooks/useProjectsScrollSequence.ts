import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useProjectsScrollSequence = () => {
  useEffect(() => {
    const projectsSection = document.querySelector('.projects') as HTMLElement;
    const projectsHeader = document.querySelector('.projects-header h2') as HTMLElement;

    if (!projectsSection || !projectsHeader) return;

    const initialFontSize = parseFloat(
      window.getComputedStyle(projectsHeader).fontSize
    );

    // Pin Projects section to show FULL CONTENT - like About section
    const projContent = projectsSection.querySelector('.projects-grid') as HTMLElement;
    const projContentHeight = projContent?.offsetHeight || window.innerHeight;
    // Minimum 12 screen heights OR 2x content height - whichever is larger
    const pinDuration = Math.max(window.innerHeight * 12, projContentHeight * 2);

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

    // Scale the title once Projects scrolls into place.
    tl.to(
      projectsHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0.1
    );

    // Fade in the projects content.
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
      tl.revert();
    };
  }, []);
};
