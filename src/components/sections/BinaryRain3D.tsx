import { useEffect, useRef } from 'react';

interface Binary3DChar {
  x: number;
  y: number;
  z: number;
  char: string;
  vx: number;
  vy: number;
  vz: number;
  brightness: number;
}

export default function BinaryRain3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const charsRef = useRef<Binary3DChar[]>([]);
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

    // Wait a tick for parent to be fully sized
    setTimeout(resizeCanvas, 0);
    window.addEventListener('resize', resizeCanvas);

    // Initialize 3D binary characters
    const initChars = () => {
      charsRef.current = [];
      const count = 40; // Number of floating characters

      for (let i = 0; i < count; i++) {
        const char: Binary3DChar = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 200 - 100,
          char: Math.random() > 0.5 ? '0' : '1',
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.3,
          vz: (Math.random() - 0.5) * 1,
          brightness: Math.random() * 0.3 + 0.2,
        };
        charsRef.current.push(char);
      }
    };

    initChars();

    // Simple perspective projection
    const project = (z: number) => {
      const focalLength = 300;
      return focalLength / (focalLength + z);
    };

    // Animation loop
    const animate = () => {
      if (visibilityRef.current && !prefersReducedMotion) {
        // Clear canvas with subtle trail effect
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw and update characters
        charsRef.current.forEach((char) => {
          // Update position
          char.x += char.vx;
          char.y += char.vy;
          char.z += char.vz;

          // Bounce off edges
          if (char.x < 0 || char.x > canvas.width) char.vx *= -1;
          if (char.y < 0 || char.y > canvas.height) char.vy *= -1;
          if (char.z < -100 || char.z > 100) char.vz *= -1;

          // Perspective scaling
          const scale = project(char.z);
          const size = 16 * scale;

          // Depth-based opacity (closer = brighter)
          const depthOpacity = 0.2 + (char.z + 100) / 200 * 0.4;

          // Draw character
          ctx.font = `bold ${size}px monospace`;
          ctx.fillStyle = `rgba(16, 185, 129, ${depthOpacity})`;
          ctx.globalAlpha = depthOpacity;

          ctx.fillText(char.char, char.x, char.y);
        });

        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="binary-3d-canvas"
      role="presentation"
      aria-hidden="true"
    />
  );
}
