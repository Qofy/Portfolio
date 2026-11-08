import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerConfig {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  markers?: boolean;
  scrub?: boolean | number;
  pin?: boolean | string;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useScrollTrigger = () => {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const createScrollAnimation = (
    target: string | HTMLElement,
    animation: gsap.TweenVars,
    config: ScrollTriggerConfig = {}
  ) => {
    const {
      trigger = target,
      start = 'top 80%',
      end = 'top 20%',
      scrub = false,
      pin = false,
      onEnter,
      onLeave,
    } = config;

    return gsap.to(target, {
      ...animation,
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        pin,
        onEnter: () => onEnter?.(),
        onLeave: () => onLeave?.(),
        markers: false,
      },
    });
  };

  const createParallax = (
    element: string | HTMLElement,
    distance: number = 100
  ) => {
    return gsap.to(element, {
      y: distance,
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    });
  };

  const createStaggerReveal = (
    selector: string,
    duration: number = 0.8,
    stagger: number = 0.2
  ) => {
    return gsap.from(selector, {
      opacity: 0,
      y: 30,
      duration,
      stagger,
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        markers: false,
      },
    });
  };

  const createCountUp = (
    element: string | HTMLElement,
    endValue: number,
    duration: number = 2
  ) => {
    const obj = { value: 0 };

    return gsap.to(obj, {
      value: endValue,
      duration,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        markers: false,
      },
      onUpdate: function () {
        if (typeof element === 'string') {
          const el = document.querySelector(element);
          if (el) el.textContent = Math.floor(obj.value).toString();
        } else {
          element.textContent = Math.floor(obj.value).toString();
        }
      },
    });
  };

  const createPinSection = (
    trigger: string | HTMLElement,
    duration: number = 3
  ) => {
    return gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: `+=${duration * 100}`,
        pin: true,
        scrub: 1,
        markers: false,
      },
    });
  };

  return {
    createScrollAnimation,
    createParallax,
    createStaggerReveal,
    createCountUp,
    createPinSection,
  };
};
