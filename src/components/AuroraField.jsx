import { useEffect, useRef } from 'react';

// A slow-drifting aurora field rendered on a plain 2D canvas — soft blurred
// blobs of cool light drifting over black, plus a sparse layer of twinkling
// dust. No WebGL, no Three.js, no extra dependencies: additive-blended
// radial gradients with a faint trailing fade. Paused when the tab is
// hidden or the user prefers reduced motion.

const BLOBS = [
  { color: '99,140,255', r: 0.58, speed: 0.05, phase: 0.0, orbitX: 0.22, orbitY: 0.07, baseY: 0.34 },
  { color: '170,150,255', r: 0.44, speed: 0.037, phase: 2.1, orbitX: 0.16, orbitY: 0.06, baseY: 0.58 },
  { color: '210,220,255', r: 0.34, speed: 0.065, phase: 4.2, orbitX: 0.26, orbitY: 0.09, baseY: 0.46 },
  { color: '120,150,235', r: 0.5, speed: 0.028, phase: 1.3, orbitX: 0.14, orbitY: 0.05, baseY: 0.62 },
];

export default function AuroraField({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;

    const dust = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function frame() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0.16)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (const b of BLOBS) {
        const cx = w * (0.5 + Math.sin(t * b.speed + b.phase) * b.orbitX);
        const cy = h * (b.baseY + Math.cos(t * b.speed * 0.8 + b.phase) * b.orbitY);
        const r = Math.max(w, h) * b.r;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${b.color},0.10)`);
        g.addColorStop(0.5, `rgba(${b.color},0.045)`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      for (const d of dust) {
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * d.speed + d.phase));
        ctx.fillStyle = `rgba(255,255,255,${(0.55 * tw).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      t += 0.016;
      raf = requestAnimationFrame(frame);
    }

    function paintStatic() {
      // Single settled frame for reduced-motion: run a handful of steps
      // so the gradients/dust are in a pleasant resting position, then stop.
      for (let i = 0; i < 40; i++) frameStep();
    }

    function frameStep() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0,0,0,0.16)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const b of BLOBS) {
        const cx = w * (0.5 + Math.sin(t * b.speed + b.phase) * b.orbitX);
        const cy = h * (b.baseY + Math.cos(t * b.speed * 0.8 + b.phase) * b.orbitY);
        const r = Math.max(w, h) * b.r;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${b.color},0.10)`);
        g.addColorStop(0.5, `rgba(${b.color},0.045)`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      for (const d of dust) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      t += 0.016;
    }

    let running = true;
    if (reduce) {
      paintStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce && running === false) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full block ${className}`} aria-hidden="true" />;
}
