import { useEffect, useRef, useState } from 'react';
import AuroraField from './AuroraField.jsx';

// A living fluid field rendered with a raw WebGL fragment shader: layered
// value noise, warped through itself twice so the wisps fold and drift
// like smoke, tinted deep blue → violet → near-white at the crests, with
// a sparse layer of twinkling dust and a soft vignette. Original GLSL,
// no libraries.
//
// `progress` is a Framer MotionValue (0..1). As it rises the camera pushes
// forward and down into the field — the "dive". The mouse adds a small
// parallax. Frame rate is capped, DPR is capped, rendering pauses when the
// tab is hidden or the canvas is off-screen, and reduced-motion renders a
// single still frame. If WebGL is unavailable we fall back to the 2D field.

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform float u_dive;
uniform vec2  u_mouse;
uniform float u_dpr;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.03 + 11.3;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time * 0.055;

  // Camera: push in and drift downward as we dive.
  float zoom = 1.0 + u_dive * 1.7;
  vec2 p = uv * 1.55 * zoom;
  p.y += u_dive * 1.1;
  p += u_mouse * 0.06;

  // Two rounds of domain warping.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.7),
                fbm(p + 4.0 * q + vec2(8.3, 2.8) - t * 0.5));
  float f = fbm(p + 4.0 * r);

  // Concentrate the wisps in a soft band that wanders with the warp.
  float centre = -0.12 + (r.x - 0.5) * 0.7 - u_dive * 0.25;
  float band = smoothstep(0.95, 0.0, abs(uv.y - centre));
  float wisp = pow(f, 1.55) * band;

  vec3 deep = vec3(0.015, 0.02, 0.06);
  vec3 c1   = vec3(0.14, 0.26, 0.85);
  vec3 c2   = vec3(0.52, 0.48, 1.00);
  vec3 c3   = vec3(0.86, 0.92, 1.00);

  vec3 col = deep;
  col = mix(col, c1, clamp(wisp * 1.5, 0.0, 1.0));
  col = mix(col, c2, smoothstep(0.36, 0.78, wisp) * 0.85);
  col += c3 * pow(smoothstep(0.55, 0.96, f * band), 3.0) * 0.55;
  col *= 0.92 + u_dive * 0.18;

  // Dust: sparse points on a coarse grid, each with its own twinkle.
  float cellPx = 26.0 * u_dpr;
  vec2 cell = floor(gl_FragCoord.xy / cellPx);
  vec2 cuv  = fract(gl_FragCoord.xy / cellPx) - 0.5;
  float h   = hash(cell);
  vec2 off  = vec2(hash(cell + 1.7), hash(cell + 3.1)) - 0.5;
  float d   = length(cuv - off * 0.8);
  float tw  = 0.35 + 0.65 * (0.5 + 0.5 * sin(u_time * (0.8 + h * 3.0) + h * 50.0));
  float star = smoothstep(0.075, 0.0, d) * step(0.935, h) * tw;
  col += star * 0.85;

  // Vignette.
  float vig = smoothstep(1.35, 0.3, length(uv));
  col *= mix(0.5, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(log || 'shader compile failed');
  }
  return s;
}

export default function FluidField({ progress, className = '' }) {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let gl;
    try {
      gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      gl = null;
    }
    if (!gl) {
      setFailed(true);
      return;
    }

    let program;
    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link failed');
    } catch {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    // One triangle that covers the viewport.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uDive = gl.getUniformLocation(program, 'u_dive');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uDpr = gl.getUniformLocation(program, 'u_dpr');

    let dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uDpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    // Mouse parallax, lerped.
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    function onMove(e) {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    let running = true;
    let visible = true;
    let last = 0;
    const start = performance.now();
    const FRAME_MS = 1000 / 45;

    function draw(now) {
      if (!running || !visible) return;
      if (now - last < FRAME_MS) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const dive = progress && typeof progress.get === 'function' ? progress.get() : 0;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uDive, Math.max(0, Math.min(1, dive)));
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    }

    if (reduce) {
      gl.uniform1f(uTime, 8.0);
      gl.uniform1f(uDive, 0);
      gl.uniform2f(uMouse, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(draw);
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        running = false;
      } else if (!reduce) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    }
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && running && !reduce) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, [progress]);

  if (failed) return <AuroraField className={className} />;

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full block ${className}`} aria-hidden="true" />;
}
