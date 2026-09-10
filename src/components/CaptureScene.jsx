import { useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';

// A code-drawn "capture" scene: a perspective wireframe floor and a skyline
// of data-blocks that materialize on load and keep resolving as the page
// scrolls, converging on a glowing gold core. No video/image assets —
// everything here is generated geometry so it stays crisp and light.

const VB_W = 1600;
const VB_H = 900;
const VP = { x: 800, y: 300 }; // vanishing point

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildScene() {
  const rand = seededRandom(42);

  const DEPTH_COUNT = 12;
  const depthLines = Array.from({ length: DEPTH_COUNT + 1 }, (_, i) => {
    const t = i / DEPTH_COUNT;
    const eased = Math.pow(t, 1.7);
    const y = VB_H - eased * (VB_H - VP.y - 6);
    return { id: `d${i}`, y, t };
  });

  const WIDTH_COUNT = 20;
  const widthLines = Array.from({ length: WIDTH_COUNT + 1 }, (_, i) => {
    const t = i / WIDTH_COUNT;
    const xBottom = -700 + t * (VB_W + 1400);
    return { id: `w${i}`, xBottom, t };
  });

  const BLOCK_COUNT = 24;
  const blocks = Array.from({ length: BLOCK_COUNT }, (_, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const laneT = rand();
    const x = side === 'left' ? 30 + laneT * 380 : VB_W - 30 - laneT * 380;
    const h = 50 + rand() * 380;
    const yBottom = 540 + rand() * 70;
    const depthT = rand();
    return { id: `b${i}`, x, h, yBottom, t: depthT };
  });

  const STREAK_COUNT = 9;
  const streaks = Array.from({ length: STREAK_COUNT }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const dist = 620 + rand() * 340;
    const x1 = VP.x + Math.cos(angle) * dist;
    const y1 = VP.y + Math.sin(angle) * dist * 0.42;
    return { id: `s${i}`, x1, y1, t: rand() };
  });

  return { depthLines, widthLines, blocks, streaks };
}

function DrawLine({ x1, y1, x2, y2, baseline, baseDelay = 0, scrollRange, scrollYProgress, stroke, strokeWidth, opacity }) {
  const scrollLength = useTransform(scrollYProgress, scrollRange, [0, 1]);
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeOpacity={opacity}
      strokeLinecap="round"
      initial={baseline ? { pathLength: 0 } : false}
      animate={baseline ? { pathLength: 1 } : undefined}
      transition={baseline ? { duration: 1.15, delay: 0.25 + baseDelay, ease: [0.16, 1, 0.3, 1] } : undefined}
      style={!baseline ? { pathLength: scrollLength } : undefined}
    />
  );
}

export default function CaptureScene({ scrollYProgress, isActive }) {
  const scene = useMemo(buildScene, []);

  const coreOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 1]);
  const coreScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.28]);
  const scanY = useTransform(scrollYProgress, [0, 1], ['92%', '30%']);
  const scanOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 0.22, 0.22, 0]);

  return (
    <div className="absolute inset-0">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {/* depth (horizontal) lines */}
        {scene.depthLines.map((l, i) => (
          <DrawLine
            key={l.id}
            x1={0}
            y1={l.y}
            x2={VB_W}
            y2={l.y}
            baseline={i < 7}
            baseDelay={i * 0.045}
            scrollRange={[0, 0.55 + l.t * 0.4]}
            scrollYProgress={scrollYProgress}
            stroke="#8C9AB3"
            strokeWidth={l.t > 0.75 ? 0.6 : 1}
            opacity={0.45 - l.t * 0.28}
          />
        ))}

        {/* width (converging) lines */}
        {scene.widthLines.map((l) => (
          <DrawLine
            key={l.id}
            x1={l.xBottom}
            y1={VB_H}
            x2={VP.x}
            y2={VP.y}
            baseline={Math.abs(l.t - 0.5) < 0.32}
            baseDelay={0.1 + Math.abs(l.t - 0.5) * 0.6}
            scrollRange={[0, 0.5 + Math.abs(l.t - 0.5) * 0.5]}
            scrollYProgress={scrollYProgress}
            stroke="#7E8CA3"
            strokeWidth={0.7}
            opacity={0.32}
          />
        ))}

        {/* side data-blocks */}
        {scene.blocks.map((b) => (
          <DrawLine
            key={b.id}
            x1={b.x}
            y1={b.yBottom}
            x2={b.x}
            y2={b.yBottom - b.h}
            baseline={b.t < 0.55}
            baseDelay={0.15 + b.t * 0.5}
            scrollRange={[0.05, 0.5 + b.t * 0.45]}
            scrollYProgress={scrollYProgress}
            stroke="#B9C4D6"
            strokeWidth={1.1}
            opacity={0.4}
          />
        ))}

        {/* convergence streaks — only resolve as you scroll through */}
        {scene.streaks.map((s) => (
          <DrawLine
            key={s.id}
            x1={s.x1}
            y1={s.y1}
            x2={VP.x}
            y2={VP.y}
            baseline={false}
            scrollRange={[0.55 + s.t * 0.1, 0.95 + s.t * 0.05]}
            scrollYProgress={scrollYProgress}
            stroke="#C9973A"
            strokeWidth={0.9}
            opacity={0.55}
          />
        ))}
      </svg>

      {/* soft scan sweep, rides along with the reveal */}
      <motion.div
        style={{ top: scanY, opacity: scanOpacity }}
        className="pointer-events-none absolute left-0 right-0 h-[140px] -translate-y-1/2"
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(234,241,255,0.9), transparent)',
            mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* gold convergence core */}
      <motion.div
        style={{
          opacity: coreOpacity,
          scale: coreScale,
          left: `${(VP.x / VB_W) * 100}%`,
          top: `${(VP.y / VB_H) * 100}%`,
        }}
        className="absolute w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full transition-[filter] duration-500"
          style={{
            background:
              'radial-gradient(circle, rgba(243,200,120,0.55) 0%, rgba(201,151,58,0.2) 45%, transparent 72%)',
            filter: isActive ? 'blur(4px) brightness(1.15)' : 'blur(7px)',
          }}
        />
      </motion.div>
    </div>
  );
}
