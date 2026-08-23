import { useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  selector: string;
  threshold?: number;
  onlyOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver
 * Adds 'animate' class when element enters viewport, removes when it leaves
 * @param options - Configuration options
 * @returns React ref to attach to the section element
 */
export function useScrollAnimation(options: UseScrollAnimationOptions) {
  const { selector, threshold = 0.2, onlyOnce = false } = options;
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If onlyOnce is true, only animate on first intersection
          if (onlyOnce && hasAnimatedRef.current) {
            return;
          }

          const animatedElements = sectionRef.current?.querySelectorAll(selector);
          animatedElements?.forEach((element) => {
            if (entry.isIntersecting) {
              element.classList.add('animate');
              if (onlyOnce) {
                hasAnimatedRef.current = true;
              }
            } else if (!onlyOnce) {
              element.classList.remove('animate');
            }
          });
        });
      },
      { threshold }
    );

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      scrollObserver.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        scrollObserver.unobserve(sectionElement);
      }
    };
  }, [selector, threshold, onlyOnce]);

  return sectionRef;
}
