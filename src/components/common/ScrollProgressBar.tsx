import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../../styles/components/ScrollProgressBar.scss';

export function ScrollProgressBar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!progressLineRef.current) return;

      // Calculate scroll percentage
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Animate the width using GSAP for smooth transition
      gsap.to(progressLineRef.current, {
        width: `${scrollPercent}%`,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div className="scroll-progress-container" ref={progressBarRef}>
      <div className="scroll-progress-line" ref={progressLineRef} />
    </div>
  );
}
