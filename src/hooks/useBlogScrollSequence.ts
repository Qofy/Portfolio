import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useBlogScrollSequence = () => {
  useEffect(() => {
    const blogSection = document.querySelector('.blog') as HTMLElement;
    const blogHeader = document.querySelector('.blog-header h2') as HTMLElement;

    if (!blogSection || !blogHeader) return;

    const initialFontSize = parseFloat(
      window.getComputedStyle(blogHeader).fontSize
    );

    const pinDuration = window.innerHeight * 5;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blogSection,
        start: 'top top',
        end: `+=${pinDuration}`,
        pin: true,
        scrub: 1,
        markers: false,
      },
    });

    tl.to(
      blogHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0
    );

    tl.to(
      '.blog-grid',
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
        if (trigger.vars.trigger === blogSection) {
          trigger.kill();
        }
      });
    };
  }, []);
};
