import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useHeroScrollSequence = () => {
  useEffect(() => {
    // Wait for DOM to be ready
    const heroSection = document.querySelector('.hero') as HTMLElement;
    const heroName = document.querySelector('.hero-name') as HTMLElement;
    const aboutSection = document.querySelector('.about') as HTMLElement;

    if (!heroSection || !heroName || !aboutSection) return;

    // Get initial font size
    const initialFontSize = parseFloat(
      window.getComputedStyle(heroName).fontSize
    );

    // Simple: just pin hero long enough for animation to complete
    // About scrolls naturally after, fully visible
    const pinDuration = window.innerHeight * 5;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: `+=${pinDuration}`,
        pin: true,
        scrub: 1,
        markers: false,
      },
    });

    // Phase 1: Scale name up
    tl.to(
      heroName,
      {
        fontSize: initialFontSize * 5,
        textShadow: '0 10px 40px rgba(0,0,0,0.1)',
        duration: 1,
      },
      0
    );

    // Phase 2: Fade hero out
    tl.to(
      '.hero-container',
      {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.8,
      },
      0.2
    );

    return () => {
      tl.revert();
    };
  }, []);
};
