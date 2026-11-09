import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useExperienceScrollSequence = () => {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.experience');
    const doors = section?.querySelector<HTMLElement>('.experience-doors');
    if (!section || !doors) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(doors, { visibility: 'visible' });
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * 1.5}`,
          pin: true,
          scrub: true,
        },
      });

      timeline.to(doors.children, {
        rotationY: (index) => index === 0 ? -105 : 105,
        duration: 1,
      }, 0);
      timeline.to(doors, { opacity: 0, duration: 0.15 }, 0.85);
      timeline.to({}, { duration: 0.2 });
    });

    return () => media.revert();
  }, []);
};
