import { useEffect, useRef } from 'react';

interface BinaryChar {
  x: number;
  y: number;
  char: string;
  brightness: number;
  speed: number;
}

export default function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const charsRef = useRef<BinaryChar[]>([]);
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
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    // Initialize canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize binary characters
    const initChars = () => {
      const cols = Math.floor(canvas.width / 20);
      charsRef.current = [];

      for (let i = 0; i < cols; i++) {
        const char: BinaryChar = {
          x: i * 20,
          y: Math.random() * canvas.height,
          char: Math.random() > 0.5 ? '0' : '1',
          brightness: Math.random() * 0.5,
          speed: Math.random() * 0.5 + 0.5,
        };
        charsRef.current.push(char);
      }
    };

    initChars();

    // Animation loop
    const animate = () => {
      if (!visibilityRef.current || prefersReducedMotion) {
        // If tab is hidden or motion reduced, just request next frame without animating
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear with slight transparency for fade effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update characters
      charsRef.current.forEach((char) => {
        // Update position
        char.y += char.speed;
        char.brightness = Math.sin(char.y * 0.01) * 0.4 + 0.2;

        // Reset if off screen
        if (char.y > canvas.height) {
          char.y = -20;
          char.char = Math.random() > 0.5 ? '0' : '1';
          char.brightness = Math.random() * 0.3;
        }

        // Draw character
        ctx.font = 'bold 14px monospace';

        // Vary opacity for depth
        const opacity = Math.max(0.05, Math.min(0.3, char.brightness));
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;

        // Occasionally brighten a character for visual interest
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(16, 185, 129, 0.6)`;
        }

        ctx.fillText(char.char, char.x, char.y);
      });

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
      className="binary-rain-canvas"
      role="presentation"
      aria-hidden="true"
    />
  );
}
