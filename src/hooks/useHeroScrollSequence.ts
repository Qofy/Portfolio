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

    // Position about section below hero initially
    gsap.set(aboutSection, { y: window.innerHeight });

    // Create the sequence timeline
    // Extended to give time for About section to be readable
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: `+=${window.innerHeight * 5}`, // Extended scroll distance for About readability
        pin: true, // Pin the hero section
        scrub: 1, // Smooth scrubbing (1 second lag)
        markers: false,
      },
    });

    // Phase 1: Grow the name text (0 to 30% of scroll)
    tl.to(
      heroName,
      {
        fontSize: initialFontSize * 3, // Grow to 3x original size
        textShadow: '0 10px 40px rgba(0,0,0,0.1)',
        duration: 0.8,
      },
      0
    );

    // Phase 2: Continue growing name (20% to 50% of scroll)
    tl.to(
      heroName,
      {
        fontSize: initialFontSize * 5, // Grow to 5x original size
        opacity: 0.2, // Fade as it grows
        duration: 1.2,
      },
      0.3
    );

    // Phase 3: Slide About section up (40% to 60% of scroll)
    tl.to(
      aboutSection,
      {
        y: 0, // Move to normal position
        opacity: 1,
        duration: 1,
      },
      0.5
    );

    // Phase 4: Fade out hero elements (60% onwards)
    tl.to(
      '.hero-container',
      {
        opacity: 0,
        pointerEvents: 'none',
        duration: 1,
      },
      0.8
    );

    // Phase 5: Keep About visible for rest of scroll (no animation after 60%)
    // About stays in place while user can scroll and read it

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === heroSection) {
          trigger.kill();
        }
      });
    };
  }, []);
};
