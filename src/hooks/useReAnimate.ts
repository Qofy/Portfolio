import { useEffect, useRef } from 'react';

interface UseReAnimateOptions {
  selector: string;
  animateClass?: string;
  delay?: number;
}

/**
 * Custom hook for re-triggering animations when content changes
 * Removes and re-adds animate class to trigger animation again
 * @param dependency - Value to watch for changes
 * @param options - Configuration options
 * @returns React ref to attach to the container element
 */
export function useReAnimate(
  dependency: any,
  options: UseReAnimateOptions
) {
  const { selector, animateClass = 'animate', delay = 0 } = options;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const animatedElements = containerRef.current?.querySelectorAll(selector);

    // Remove animate class
    animatedElements?.forEach((element) => {
      element.classList.remove(animateClass);
    });

    // Re-add animate class after delay
    if (delay > 0) {
      setTimeout(() => {
        animatedElements?.forEach((element) => {
          element.classList.add(animateClass);
        });
      }, delay);
    } else {
      // Use requestAnimationFrame for immediate re-animation
      requestAnimationFrame(() => {
        animatedElements?.forEach((element) => {
          element.classList.add(animateClass);
        });
      });
    }
  }, [dependency, selector, animateClass, delay]);

  return containerRef;
}
