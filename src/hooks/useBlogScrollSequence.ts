import { useLayoutEffect, useRef } from 'react';
import type { BlogPost } from '../types/blog';

export function useBlogScrollSequence(posts: BlogPost[]) {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useRef(new Set<string>());

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) return;

    const items = section.querySelectorAll<HTMLElement>('[data-blog-reveal]');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const item = entry.target as HTMLElement;
        revealed.current.add(item.dataset.blogReveal!);
        item.removeAttribute('data-reveal-pending');
        observer.unobserve(item);
      }
    }, { rootMargin: '0px 0px -48px 0px' });

    for (const item of items) {
      const pending = !revealed.current.has(item.dataset.blogReveal!);
      item.toggleAttribute('data-reveal-pending', pending);
      if (pending) observer.observe(item);
    }

    return () => observer.disconnect();
  }, [posts]);

  return sectionRef;
}
