import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSectionScrollReveal = () => {
  useEffect(() => {
    // Get all sections
    const sections = document.querySelectorAll('section[data-section]');

    sections.forEach((section, index) => {
      const sectionElement = section as HTMLElement;

      // Get all content that should reveal progressively
      const contentElements = sectionElement.querySelectorAll(
        '.about-text p, .skill-group, .background-timeline, .experience-timeline, .project-card, .blog-card'
      );

      if (contentElements.length === 0) return;

      // Calculate total scroll distance: 1 screen per content element + 1 screen buffer
      const scrollDistance = contentElements.length * window.innerHeight;

      // Pin this section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          markers: false,
        },
      });

      // Reveal each content element progressively
      contentElements.forEach((element, elementIndex) => {
        tl.from(
          element,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          elementIndex * 0.5 // Stagger timing
        );
      });

      // Optional: Add fade out at the end
      if (index < sections.length - 1) {
        tl.to(
          sectionElement,
          {
            opacity: 0.5,
            duration: 0.3,
          },
          tl.duration() - 0.3
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};
