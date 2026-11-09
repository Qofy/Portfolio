import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useBackgroundScrollSequence = () => {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.background');
    const container = section?.querySelector<HTMLElement>('.background-container');
    const roll = container?.querySelector<HTMLElement>('.background-roll');
    if (!section || !container || !roll) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(section, { height: '100dvh', minHeight: 0, alignItems: 'flex-start' });
      gsap.set(container, { y: 0 });
      const panContainer = gsap.quickSetter(container, 'y', 'px');

      let rollHeight = 0;
      let availableHeight = 0;
      const renderRoll = ({ progress }: ScrollTrigger) => {
        const revealed = Math.min(progress / 0.88, 1);
        const depth = rollHeight * revealed;
        roll.style.setProperty('--roll-depth', `${depth}px`);
        roll.style.setProperty('--roll-edge', String(Math.min(1, (1 - revealed) * 12)));
        // Follow the roll on short screens once its edge reaches the viewport bottom.
        panContainer(-Math.max(0, depth - availableHeight));
      };

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(section.clientHeight, roll.offsetHeight) * 1.5}`,
        pin: true,
        onRefresh: (trigger) => {
          rollHeight = roll.offsetHeight;
          availableHeight = section.clientHeight - container.offsetTop - roll.offsetTop - 24;
          renderRoll(trigger);
        },
        onUpdate: renderRoll,
      });

      return () => {
        roll.style.removeProperty('--roll-depth');
        roll.style.removeProperty('--roll-edge');
      };
    });

    return () => media.revert();
  }, []);
};
