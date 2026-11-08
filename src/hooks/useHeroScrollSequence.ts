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

    // Calculate About section height for proper scrolling time
    const aboutHeight = aboutSection.offsetHeight || window.innerHeight;

    // Create the sequence timeline
    // Hero pins while About slides up, then continues so About can be fully scrolled
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        // Give enough scroll distance: hero animation (3vh) + About content scroll time
        end: `+=${window.innerHeight * 2 + aboutHeight}`,
        pin: true, // Pin the hero section
        scrub: 1, // Smooth scrubbing (1 second lag)
        markers: false,
      },
    });

    // Phase 1: Grow the name text quickly (first 20% of scroll)
    tl.to(
      heroName,
      {
        fontSize: initialFontSize * 3,
        textShadow: '0 10px 40px rgba(0,0,0,0.1)',
        duration: 0.6,
      },
      0
    );

    // Phase 2: Continue growing name to max (20% to 35% of scroll)
    tl.to(
      heroName,
      {
        fontSize: initialFontSize * 5,
        opacity: 0.1,
        duration: 0.5,
      },
      0.2
    );

    // Phase 3: Slide About section up quickly (25% to 40% of scroll)
    tl.to(
      aboutSection,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
      },
      0.3
    );

    // Phase 4: Fade out hero (40% to 50% of scroll)
    tl.to(
      '.hero-container',
      {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.4,
      },
      0.55
    );

    // Phase 5: Keep About visible for entire remaining scroll (50% to 100%)
    // About stays fully visible while user scrolls and reads
    // Just complete the timeline - About remains at full opacity
    tl.set(
      aboutSection,
      {
        opacity: 1, // Keep at full opacity
      },
      0.7
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
