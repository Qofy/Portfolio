import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getSectionAnchor } from '../utils/sectionAnchor';

export function useSectionSlideHandoffs() {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main section[data-section]:not([data-section="hero"])')];
    const handoffs = sections.slice(0, -1).map((outgoing, index) => ({
      outgoing,
      incoming: sections[index + 1],
    }));

    let covered: { section: HTMLElement; translate: string; offset: number } | undefined;
    const release = () => {
      if (!covered) return;
      covered.section.style.translate = covered.translate;
      covered = undefined;
    };

    const update = () => {
      for (const { outgoing, incoming } of handoffs) {
        const top = getSectionAnchor(incoming).getBoundingClientRect().top;
        const height = Math.min(window.innerHeight, outgoing.clientHeight);
        if (top <= 0 || top >= height) continue;

        if (covered?.section !== outgoing) {
          release();
          covered = { section: outgoing, translate: outgoing.style.translate, offset: 0 };
        }
        // Keep the last visible part of the outgoing section still as the next covers it.
        const bounds = outgoing.getBoundingClientRect();
        covered.offset += height - bounds.bottom;
        outgoing.style.translate = `0 ${covered.offset}px`;
        return;
      }
      release();
    };

    window.addEventListener('scroll', update, { passive: true });
    ScrollTrigger.addEventListener('refreshInit', release);
    ScrollTrigger.addEventListener('refresh', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      ScrollTrigger.removeEventListener('refreshInit', release);
      ScrollTrigger.removeEventListener('refresh', update);
      release();
    };
  }, []);
}
