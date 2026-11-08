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

    // Hero animation only - pin just long enough for name scale + About slide
    // About scrolls naturally after, so all content is visible on screen
    const heroAnimDistance = window.innerHeight * 3.5;

    // Create the sequence timeline for HERO ONLY
    // After this completes, About scrolls naturally with all content visible
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: `+=${heroAnimDistance}`,
        pin: true, // Pin only during hero animation
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

    // After hero animation completes, About section scrolls naturally
    // with ALL content visible on screen. Next section appears after About is fully scrolled.

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
