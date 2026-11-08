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

    // For Blog (last section): extended pin so you can scroll through ALL blog posts
    // Get number of blog cards to calculate proper scroll distance
    const blogCards = blogSection.querySelectorAll('.blog-card').length;
    const scrollPerCard = window.innerHeight * 0.8; // Each card needs scroll space
    const contentScrollDistance = Math.max(blogCards * scrollPerCard, window.innerHeight * 5);
    const slideDuration = window.innerHeight * 2 + contentScrollDistance;

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

    // Phase 3: Fade in blog content and keep visible while scrolling through posts
    tl.to(
      '.blog-grid',
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
      0.3
    );

    // Phase 4: Keep blog content visible and scrollable for viewing all posts
    tl.set(
      '.blog-grid',
      {
        opacity: 1,
      },
      0.5
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
