import { useEffect, useRef } from 'react';

/**
 * FilmGrainCanvas
 * Lightweight 60fps canvas particle system simulating 35mm film dust motes
 * and paper grain texture. Supports prefers-reduced-motion.
 */
export default function FilmGrainCanvas({ theme = 'light' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive particle count (fewer on mobile for max battery/60fps)
    const particleCount = width < 768 ? 24 : 45;
    const particles = [];

    const isDark = theme === 'dark';
    const baseColor = isDark ? '240, 240, 245' : '20, 20, 25';

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.4,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35 - 0.1, // subtle upward drift like dust in a cinema beam
        opacity: Math.random() * 0.28 + 0.08,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseVal: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting film dust motes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulseVal += p.pulseSpeed;

          // Wrap edges
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulseVal));

        ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* 35mm Dust Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Ultra-subtle Newsprint Paper Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045] pointer-events-none mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
    </div>
  );
}
