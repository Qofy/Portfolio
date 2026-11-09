import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useProjectsScrollSequence = (gridRef: RefObject<HTMLDivElement | null>, activeFilter: string) => {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      grid.querySelectorAll('.project-card').forEach((card) => {
        gsap.fromTo(card, { '--frame-reveal': 0 }, {
          '--frame-reveal': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 94%',
            end: 'top 48%',
            scrub: true,
            // Measure the cards after the preceding section pins.
            refreshPriority: -1,
          },
        });
      });
    });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh);
      media.revert();
    };
  }, [gridRef, activeFilter]);
};
