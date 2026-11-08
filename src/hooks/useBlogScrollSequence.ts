import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useBlogScrollSequence = () => {
  useEffect(() => {
    const blogSection = document.querySelector('.blog') as HTMLElement;
    const blogHeader = document.querySelector('.blog-header h2') as HTMLElement;
    const blogContainer = document.querySelector('.blog-container') as HTMLElement;

    if (!blogSection || !blogHeader || !blogContainer) return;

    const initialFontSize = parseFloat(
      window.getComputedStyle(blogHeader).fontSize
    );

    // For Blog (last section): extended pin so you can scroll through ALL blog posts
    // Get blog section height and give generous scroll space - like other sections
    const blogHeight = blogContainer.offsetHeight;
    // Ensure minimum 12 screen heights, or 2x the blog height, whichever is larger
    const minScrollSpace = Math.max(window.innerHeight * 12, blogHeight * 2);
    const slideDuration = minScrollSpace;

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

    // Phase 1: Scale blog title up
    tl.to(
      blogHeader,
      {
        fontSize: initialFontSize * 1.5,
        opacity: 1,
        duration: 1,
      },
      0
    );

    // Phase 2: Fade in blog controls
    tl.to(
      '.blog-controls',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
      },
      0.1
    );

    // Phase 3: Keep blog content visible while scrolling through posts
    // Blog cards handle their own fade-in animations
    tl.set(
      '.blog-grid',
      {
        opacity: 1,
      },
      0.2
    );

    return () => {
      tl.revert();
    };
  }, []);
};
