import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export const useLenisScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1, // Lower = smoother but slower
      wheelMultiplier: 1, // Wheel scroll speed
      touchMultiplier: 1.5, // Touch scroll speed
      duration: 1.2, // Animation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    });

    lenisRef.current = lenis;

    // Integrate with GSAP
    lenis.on('scroll', () => {
      // Update GSAP timeline if needed
      gsap.ticker.tick();
    });

    // Animation loop
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    // Optional: Sync with GSAP ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Scroll to top on mount
    lenis.scrollTo(0, { immediate: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return lenisRef.current;
};
