import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useBlogScrollSequence = () => {
  useEffect(() => {
    const blogSection = document.querySelector('.blog') as HTMLElement;
    const blogHeader = document.querySelector('.blog-header h2') as HTMLElement;

    if (!blogSection || !blogHeader) return;

    // Position Blog below viewport initially
    gsap.set(blogSection, { y: window.innerHeight });

    const initialFontSize = parseFloat(
      window.getComputedStyle(blogHeader).fontSize
    );

    // For Blog (last section): slide in animation only, then scroll freely
    // Calculate duration just enough for slide-in animation
    const slideDuration = window.innerHeight * 1.5;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blogSection,
        start: 'top top',
        end: `+=${slideDuration}`,
        pin: true,
        scrub: 1,
        markers: false,
      },
    });

    // Phase 1: Slide Blog section up into viewport
    tl.to(
      blogSection,
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      },
      0
    );

    // Phase 2: Scale blog title up
    tl.to(
      blogHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0.1
    );

    // Phase 3: Fade in blog content
    tl.to(
      '.blog-grid',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.3
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === blogSection) {
          trigger.kill();
        }
      });
    };
  }, []);
};
