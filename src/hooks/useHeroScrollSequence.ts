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

    // Get About content elements for progressive reveal
    const aboutContentElements = aboutSection.querySelectorAll(
      '.about-text p, .about-text li, .about-stats .stat'
    );

    // Calculate scroll distance: hero animation + About progressive reveals
    // Each element needs scroll space for staggered reveal (0.4s per element with scrub: 1)
    const revealDistance = aboutContentElements.length * window.innerHeight * 0.5;
    const totalDistance = window.innerHeight * 5 + revealDistance;

    // Create the sequence timeline
    // This SINGLE timeline handles: hero animation + About taking full control + progressive reveals
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: `+=${totalDistance}`,
        pin: true, // Pin throughout hero animation AND About reveals
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

    // Phase 5: About takes FULL CONTROL - Progressive reveal of all content (50% to 100%)
    // Stagger reveal each About content element (animate FROM 0 TO 1)
    aboutContentElements.forEach((element, index) => {
      tl.to(
        element,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        0.65 + index * 0.5 // Start earlier, more stagger per element
      );
    });

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
