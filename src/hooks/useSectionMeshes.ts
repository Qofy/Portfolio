import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const columns = 32;
const rows = 20;
const maxCanvasPixels = 2_400_000;

export function useSectionMeshes() {
  useEffect(() => {
    const surfaces = Array.from(document.querySelectorAll<HTMLCanvasElement>('main .section-mesh'))
      .flatMap((canvas) => {
        const section = canvas.parentElement;
        const context = canvas.getContext('2d');
        if (!section || !context) return [];
        return [{ canvas, section, context, phase: NaN, dark: false }];
      });

    if (!surfaces.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const x = new Float32Array(rows * columns);
    const y = new Float32Array(rows * columns);
    let frame = 0;

    const paint = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const viewportPixels = window.innerWidth * viewportHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(maxCanvasPixels / viewportPixels));
      const phase = reducedMotion.matches ? 0 : window.scrollY / viewportHeight * 0.52;
      const darkTheme = document.documentElement.dataset.theme === 'dark';

      surfaces.forEach((surface, index) => {
        const { canvas, section, context } = surface;
        const bounds = section.getBoundingClientRect();
        if (bounds.bottom <= 0 || bounds.top >= viewportHeight) {
          if (canvas.width !== 1) {
            canvas.width = 1;
            canvas.height = 1;
            surface.phase = NaN;
          }
          return;
        }

        const height = Math.min(section.clientHeight, viewportHeight);
        const offset = Math.min(Math.max(0, -bounds.top), section.clientHeight - height);
        canvas.style.top = `${offset}px`;
        canvas.style.height = `${height}px`;
        const width = Math.max(1, Math.round(section.clientWidth * ratio));
        const pixelsHigh = Math.max(1, Math.round(height * ratio));
        const dark = darkTheme || section.dataset.section === 'experience';
        const resized = canvas.width !== width || canvas.height !== pixelsHigh;
        if (!resized && surface.phase === phase && surface.dark === dark) return;

        if (resized) {
          canvas.width = width;
          canvas.height = pixelsHigh;
        }
        surface.phase = phase;
        surface.dark = dark;
        const hero = section.dataset.section === 'hero';
        const offsetPhase = phase + index * 0.8;
        const drift = Math.sin(offsetPhase * 0.7) * width * 0.14;

        for (let row = 0; row < rows; row++) {
          const depth = row / (rows - 1);
          const perspective = 1 / (0.7 + depth * 1.8);
          for (let column = 0; column < columns; column++) {
            const across = column / (columns - 1) - 0.5;
            const wave = Math.sin(across * 10 + depth * 6 - offsetPhase) * 0.095
              + Math.cos(across * 6 - depth * 8 + offsetPhase * 0.65) * 0.055;
            const point = row * columns + column;
            x[point] = width * 0.5 + (across * width * 2.3 + drift * depth) * perspective;
            y[point] = pixelsHigh * (0.46 + (0.37 + wave) * perspective);
          }
        }

        context.clearRect(0, 0, width, pixelsHigh);
        const stroke = context.createLinearGradient(0, pixelsHigh * 0.42, width * 0.65, pixelsHigh);
        stroke.addColorStop(0, 'transparent');
        stroke.addColorStop(0.5, dark ? 'rgba(222, 159, 255, 0.44)' : 'rgba(68, 62, 93, 0.35)');
        stroke.addColorStop(1, dark ? 'rgba(255, 119, 155, 0.64)' : 'rgba(155, 56, 91, 0.4)');
        context.strokeStyle = stroke;
        context.lineWidth = ratio * 0.9;
        context.globalAlpha = hero ? 0.78 : 0.34;
        context.beginPath();
        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            const point = row * columns + column;
            if (column === 0) context.moveTo(x[point], y[point]);
            else context.lineTo(x[point], y[point]);
          }
        }
        for (let column = 0; column < columns; column++) {
          for (let row = 0; row < rows; row++) {
            const point = row * columns + column;
            if (row === 0) context.moveTo(x[point], y[point]);
            else context.lineTo(x[point], y[point]);
          }
        }
        context.stroke();
      });
    };

    const queuePaint = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const themeObserver = new MutationObserver(queuePaint);
    themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] });
    reducedMotion.addEventListener('change', queuePaint);
    window.addEventListener('resize', queuePaint);
    window.addEventListener('scroll', queuePaint, { passive: true });
    ScrollTrigger.addEventListener('refresh', queuePaint);
    queuePaint();

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      reducedMotion.removeEventListener('change', queuePaint);
      window.removeEventListener('resize', queuePaint);
      window.removeEventListener('scroll', queuePaint);
      ScrollTrigger.removeEventListener('refresh', queuePaint);
    };
  }, []);
}
