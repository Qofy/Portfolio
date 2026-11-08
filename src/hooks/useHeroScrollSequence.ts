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

    // Extended pin: hero animation + About takes full control
    // Keep pinned long enough so About is fully visible before Skills appears
    const heroAnimDistance = window.innerHeight * 6.5;

    // Create the sequence timeline
    // Pin for hero animation AND to let About take full viewport control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: `+=${heroAnimDistance}`,
        pin: true, // Pin throughout - hero anim + About visible
        scrub: 1, // Smooth scrubbing
        markers: false,
      },
    });

    // Phase 1: Grow the name text quickly (0-20% of timeline)
    tl.to(
      heroName,
      {
        fontSize: initialFontSize * 3,
        textShadow: '0 10px 40px rgba(0,0,0,0.1)',
        duration: 0.6,
      },
      0
    );

    // Phase 2: Continue growing name to max (20-35% of timeline)
    tl.to(
      heroName,
      {
        fontSize: initialFontSize * 5,
        opacity: 0.1,
        duration: 0.5,
      },
      0.2
    );

    // Phase 3: Slide About section up (25-40% of timeline)
    tl.to(
      aboutSection,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
      0.3
    );

    // Phase 4: Fade out hero (40-50% of timeline)
    tl.to(
      '.hero-container',
      {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.4,
      },
      0.55
    );

    // Phase 5: About takes FULL CONTROL (50% to 100% of timeline)
    // Keep About pinned and fully visible on viewport
    // This ensures Skills doesn't appear until user has scrolled well past About
    tl.set(
      aboutSection,
      {
        opacity: 1,
        y: 0,
      },
      0.65
    );

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
