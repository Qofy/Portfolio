import { useEffect, useRef } from 'react';

interface Achievement3D {
  text: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

const achievementKeywords = [
  'Certificate', 'Degree', 'Achievement', 'Expert',
  'Mastery', 'Learning', 'Growth', 'Success',
  'Certified', 'Qualified', 'Skilled', 'Accomplished',
  'Professional', 'Trained', 'Experienced', 'Advanced',
  'Graduated', 'Awarded', 'Recognized', 'Credentialed',
  'Knowledge', 'Expertise', 'Proficiency', 'Competent'
];

export default function FloatingAchievements() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const achievementsRef = useRef<Achievement3D[]>([]);
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

    // Initialize 3D achievements
    const initAchievements = () => {
      achievementsRef.current = [];
      const count = 32;

      for (let i = 0; i < count; i++) {
        const achievement: Achievement3D = {
          text: achievementKeywords[i % achievementKeywords.length],
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 200 - 100,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.35,
          vz: (Math.random() - 0.5) * 1.1,
        };
        achievementsRef.current.push(achievement);
      }
    };

    initAchievements();

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

        // Draw and update achievements
        achievementsRef.current.forEach((achievement) => {
          // Update position
          achievement.x += achievement.vx;
          achievement.y += achievement.vy;
          achievement.z += achievement.vz;

          // Bounce off edges
          if (achievement.x < 0 || achievement.x > canvas.width) achievement.vx *= -1;
          if (achievement.y < 0 || achievement.y > canvas.height) achievement.vy *= -1;
          if (achievement.z < -100 || achievement.z > 100) achievement.vz *= -1;

          // Perspective scaling
          const scale = project(achievement.z);
          const size = 16 * scale;

          // Depth-based opacity and color (golden/amber theme for achievements)
          const depthOpacity = 0.2 + (achievement.z + 100) / 200 * 0.45;

          // Color gradient from amber to gold based on z-depth
          let colorHue = 45 + ((achievement.z + 100) / 200) * 15; // 45-60 (amber to gold)
          let colorStr = `hsla(${colorHue}, 85%, 50%, ${depthOpacity})`;

          // Draw achievement text
          ctx.font = `600 ${size}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
          ctx.fillStyle = colorStr;
          ctx.globalAlpha = depthOpacity;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.fillText(achievement.text, achievement.x, achievement.y);
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
      className="floating-achievements-canvas"
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
