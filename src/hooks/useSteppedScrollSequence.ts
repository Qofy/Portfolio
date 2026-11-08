import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steppedPins = new Map<ScrollTrigger, boolean>();
let wheelHandled = false;
let lastWheelTime = -Infinity;

export const useSteppedScrollSequence = (
  sectionSelector: string,
  containerSelector: string,
  stepSelector: string,
  { slideToNext = false, introSelector = '' } = {},
) => {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(sectionSelector);
    const container = section?.querySelector<HTMLElement>(containerSelector);
    if (!section || !container) return;

    const steps = container.querySelectorAll(stepSelector);
    if (!steps.length) return;
    const smoothReveal = !!introSelector && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdDuration = smoothReveal ? 0.15 : 1;
    const timelineDuration = steps.length + holdDuration;

    const context = gsap.context(() => {
      gsap.set(section, { height: '100dvh', minHeight: 0, alignItems: 'flex-start' });
      gsap.set(steps, smoothReveal ? { opacity: 0, y: 14 } : { opacity: 0 });

      let touchHandled = false;
      const touch = ScrollTrigger.observe({
        target: section,
        type: 'touch',
        preventDefault: true,
        tolerance: 24,
        onUp: () => moveTouch(1),
        onDown: () => moveTouch(-1),
        onPress: () => { touchHandled = false; },
      });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${section.clientHeight * timelineDuration * 0.3}`,
          pin: true,
          scrub: smoothReveal ? 2.8 : true,
          invalidateOnRefresh: true,
          onToggle: ({ isActive }) => {
            if (isActive) touch.enable();
            else touch.disable();
          },
        },
      });

      steps.forEach((step, index) => {
        const start = index + (smoothReveal ? 0.04 : 0.25);
        const duration = smoothReveal ? 0.96 : 0.75;
        // Bring each new item into view on screens where the content is taller than the pin.
        timeline.to(container, {
          y: () => {
            const bottom = step.getBoundingClientRect().bottom - container.getBoundingClientRect().top;
            const revealOffset = smoothReveal ? Number(gsap.getProperty(step, 'y')) : 0;
            return -Math.max(0, container.offsetTop + bottom - revealOffset + 24 - section.clientHeight);
          },
          duration,
          ease: 'none',
        }, start);
        timeline.to(step, smoothReveal
          ? { opacity: 1, y: 0, duration, ease: 'power1.inOut' }
          : { opacity: 1, duration: 0.45 },
        start);
      });

      // Keep the last item visible at the end of the pin.
      timeline.to({}, { duration: holdDuration });

      const pin = timeline.scrollTrigger!;
      steppedPins.set(pin, slideToNext);

      if (smoothReveal) {
        const scrubTween = pin.getTween();
        if (scrubTween) {
          // ScrollTrigger's default scrub ease makes most of the reveal happen up front.
          scrubTween.vars.ease = 'none';
          scrubTween.invalidate();
        }
        gsap.from(container.querySelectorAll(introSelector), {
          opacity: 0,
          y: 14,
          duration: 2.4,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      const jumpTo = (top: number) => {
        window.scrollTo({ top, behavior: 'instant' });
        ScrollTrigger.update();
      };

      const move = (direction: number, distance = 0) => {
        const position = window.scrollY;
        const slideEnd = pin.end + section.clientHeight;
        if (slideToNext && position >= pin.end - 2 && position <= slideEnd + 2) {
          const movingThroughSlide = direction > 0 ? position < slideEnd : position > pin.end;
          const maxTravel = section.clientHeight / 4;
          if (movingThroughSlide && distance > maxTravel) {
            const destination = position + direction * maxTravel;
            jumpTo(direction > 0 ? Math.min(destination, slideEnd + 1) : Math.max(destination, pin.end - 1));
            return true;
          }
        }

        if (position < pin.start || position > pin.end) {
          const destination = position + direction * distance;
          const entry = direction > 0 ? pin.start : pin.end;
          // A fast gesture should enter the nearest pinned section in its path.
          for (const other of steppedPins.keys()) {
            if (other === pin) continue;
            if (position >= other.start && position <= other.end) return false;
            const otherEntry = direction > 0 ? other.start : other.end;
            if ((otherEntry - position) * direction >= 0 && (entry - otherEntry) * direction > 0) return false;
          }
          if (position < pin.start && destination >= pin.start) {
            jumpTo(pin.start + 1);
          } else if (position > pin.end && destination <= pin.end) {
            jumpTo(slideToNext ? pin.end - 1 : pin.start + (pin.end - pin.start) * steps.length / timelineDuration);
          } else {
            return false;
          }
          return true;
        }

        const stepSize = (pin.end - pin.start) / timelineDuration;
        const currentStep = Math.min(steps.length, Math.floor((position - pin.start + 2) / stepSize));
        const nextStep = currentStep + direction;
        if (nextStep < 0) {
          const previousSlidesIn = [...steppedPins].some(([other, slidesForward]) =>
            slidesForward && other.trigger instanceof HTMLElement &&
            Math.abs(other.end + other.trigger.clientHeight - pin.start) < 4,
          );
          if (previousSlidesIn && distance > 0) return false;
          jumpTo(pin.start - 2);
        } else if (nextStep > steps.length) {
          if (slideToNext && distance > 0) return false;
          jumpTo(slideToNext ? pin.end + 1 : slideEnd + 1);
        } else {
          jumpTo(slideToNext && nextStep === steps.length ? pin.end - 1 : pin.start + nextStep * stepSize + 1);
        }
        return true;
      };

      // A trackpad gesture sends a burst of wheel events, including momentum.
      const onWheel = (event: WheelEvent) => {
        if (event.defaultPrevented || event.ctrlKey || !event.cancelable || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        if (event.target instanceof Element && event.target.closest('.chatbox-overlay')) return;
        if (event.timeStamp - lastWheelTime > 180) wheelHandled = false;
        lastWheelTime = event.timeStamp;

        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? section.clientHeight : 1;
        if (!wheelHandled) {
          wheelHandled = move(Math.sign(event.deltaY), Math.abs(event.deltaY) * unit);
        }
        if (wheelHandled) event.preventDefault();
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.target instanceof Element && event.target.closest('input, textarea, select, button, a, [contenteditable]')) return;

        const directions: Record<string, number> = {
          ArrowDown: 1,
          ArrowUp: -1,
          PageDown: 1,
          PageUp: -1,
          ' ': event.shiftKey ? -1 : 1,
        };
        const direction = directions[event.key];
        if (!direction) return;

        const inSection = window.scrollY >= pin.start && window.scrollY <= pin.end;
        if (event.repeat && inSection) {
          event.preventDefault();
        } else if (move(direction, event.key.startsWith('Arrow') ? 40 : section.clientHeight)) {
          event.preventDefault();
        }
      };

      const moveTouch = (direction: number) => {
        if (!touchHandled) touchHandled = move(direction);
      };
      if (!pin.isActive) touch.disable();
      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('keydown', onKeyDown);

      return () => {
        steppedPins.delete(pin);
        touch.kill();
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('keydown', onKeyDown);
      };
    });

    return () => context.revert();
  }, [sectionSelector, containerSelector, stepSelector, slideToNext, introSelector]);
};
