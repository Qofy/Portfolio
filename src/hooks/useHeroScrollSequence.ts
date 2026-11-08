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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: `+=${window.innerHeight * 3}`, // Scroll distance for the animation
        pin: true, // Pin the hero section
        scrub: 1, // Smooth scrubbing (1 second lag)
        markers: false,
      },
    });

    // Phase 1: Grow the name text significantly (0 to 50% of scroll)
    tl.to(
      heroName,
      {
        fontSize: initialFontSize * 3, // Grow to 3x original size
        textShadow: '0 10px 40px rgba(0,0,0,0.1)',
        duration: 1,
      },
      0
    );

    // Phase 2: Continue growing name and start sliding up About (50% to 100%)
    tl.to(
      heroName,
      {
        fontSize: initialFontSize * 5, // Grow to 5x original size
        opacity: 0.2, // Fade as it grows
        duration: 1,
      },
      0.5
    );

    // Slide About section up from bottom
    tl.to(
      aboutSection,
      {
        y: 0, // Move to normal position
        opacity: 1,
        duration: 1,
      },
      0.5
    );

    // Fade out hero elements
    tl.to(
      '.hero-container',
      {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
      },
      0.75
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
