// Magnetic primary buttons. One delegated listener for the whole page: while
// a mouse is over a `.btn-primary`, the button leans a few pixels toward the
// cursor through two CSS variables the button's own transform reads, and
// settles back when the cursor leaves. Mouse only (a finger has no hover),
// and nothing under reduced motion. The lean is small on purpose: the button
// should feel alive, not loose.

const PULL = 0.22; // how far the button follows, as a share of the cursor offset
const MAX = 7;     // px

function reset(el) {
  el.style.setProperty('--mx', '0px');
  el.style.setProperty('--my', '0px');
}

export function installMagnetic() {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {};

  let active = null;

  function onMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const el = e.target.closest?.('.btn-primary');
    if (active && el !== active) {
      reset(active);
      active = null;
    }
    if (!el) return;
    active = el;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const x = Math.max(-MAX, Math.min(MAX, dx * PULL));
    const y = Math.max(-MAX, Math.min(MAX, dy * PULL));
    el.style.setProperty('--mx', `${x.toFixed(1)}px`);
    el.style.setProperty('--my', `${y.toFixed(1)}px`);
  }

  function onLeave(e) {
    const el = e.target.closest?.('.btn-primary');
    if (el) reset(el);
    if (active === el) active = null;
  }

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerout', onLeave, { passive: true });
  return () => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerout', onLeave);
  };
}
