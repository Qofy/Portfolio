import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useAboutScrollSequence = () => {
  useEffect(() => {
    const aboutSection = document.querySelector('.about') as HTMLElement;
    const aboutHeader = document.querySelector('.about-header h2') as HTMLElement;

    if (!aboutSection || !aboutHeader) return;

    // Get initial font size of about header
    const initialFontSize = parseFloat(
      window.getComputedStyle(aboutHeader).fontSize
    );

    // Pin About section for ~5 screen heights to take full control
    // Skills won't appear until After this duration
    const pinDuration = window.innerHeight * 5;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top top',
        end: `+=${pinDuration}`,
        pin: true,
        scrub: 1,
        markers: false,
      },
    });

    // Phase 1: Scale about title up
    tl.to(
      aboutHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0
    );

    // Phase 2: Fade in about content
    tl.to(
      '.about-content',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.2
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === aboutSection) {
          trigger.kill();
        }
      });
    };
  }, []);
};
