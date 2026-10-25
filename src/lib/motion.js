// Shared reveal variants. Only transform + opacity are animated.
//
// One curve for everything that arrives (a fast start, a long soft stop) and
// a short rise rather than a long one: the element should feel like it was
// already there and the page caught up to it. Reduced motion is handled by
// the global rule in index.css, which collapses every duration to nothing.
export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: Math.min(i, 6) * 0.07, ease: EASE },
  }),
};

export const viewportOnce = { once: true, margin: '-80px' };
