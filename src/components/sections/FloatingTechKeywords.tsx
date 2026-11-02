import { useEffect, useRef } from 'react';

interface Tech3DKeyword {
  text: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

const techKeywords = [
  'React', 'Next.js', 'TypeScript', 'JavaScript',
  'Tailwind', 'Node.js', 'Firebase', 'GraphQL',
  'Cypress', 'Jest', 'Git', 'Docker',
  'AWS', 'Vercel', 'Redux', 'CSS',
  'HTML', 'Figma', 'Jira', 'GitHub',
  'API', 'REST', 'SQL', 'NoSQL'
];

export default function FloatingTechKeywords() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keywordsRef = useRef<Tech3DKeyword[]>([]);
  const animationRef = useRef<number>(0);
  const visibilityRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle tab visibility
    const handleVisibilityChange = () => {
      visibilityRef.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Set canvas size with high-DPI support
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;

      if (!parent) return;

      const width = parent.clientWidth || window.innerWidth;
      const height = parent.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize 3D keywords
    const initKeywords = () => {
      keywordsRef.current = [];
      const count = 30;

      for (let i = 0; i < count; i++) {
        const keyword: Tech3DKeyword = {
          text: techKeywords[i % techKeywords.length],
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 200 - 100,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.4,
          vz: (Math.random() - 0.5) * 1.2,
        };
        keywordsRef.current.push(keyword);
      }
    };

    initKeywords();

    // Simple perspective projection
    const project = (z: number) => {
      const focalLength = 300;
      return focalLength / (focalLength + z);
    };

    // Animation loop
    const animate = () => {
      if (visibilityRef.current && !prefersReducedMotion) {
        // Clear canvas with white background
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw and update keywords
        keywordsRef.current.forEach((keyword) => {
          // Update position
          keyword.x += keyword.vx;
          keyword.y += keyword.vy;
          keyword.z += keyword.vz;

          // Bounce off edges
          if (keyword.x < 0 || keyword.x > canvas.width) keyword.vx *= -1;
          if (keyword.y < 0 || keyword.y > canvas.height) keyword.vy *= -1;
          if (keyword.z < -100 || keyword.z > 100) keyword.vz *= -1;

          // Perspective scaling
          const scale = project(keyword.z);
          const size = 14 * scale;

          // Depth-based opacity and color
          const depthOpacity = 0.25 + (keyword.z + 100) / 200 * 0.4;

          // Color gradient from teal to blue based on z-depth
          let colorHue = 190 + ((keyword.z + 100) / 200) * 30; // 190-220
          let colorStr = `hsla(${colorHue}, 65%, 50%, ${depthOpacity})`;

          // Draw keyword
          ctx.font = `500 ${size}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
          ctx.fillStyle = colorStr;
          ctx.globalAlpha = depthOpacity;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.fillText(keyword.text, keyword.x, keyword.y);
        });

        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="floating-tech-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
