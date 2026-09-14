import { Link } from 'react-router-dom';
import { footer } from '../data.js';

export default function Footer() {
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="bg-ink text-white/35 py-8 border-t border-white/10">
      <div className="section-wrap flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.14em]">
        <Link to="/" className="flex items-center normal-case tracking-normal" aria-label={footer.brand}>
          <img src="/brand/lockup-white.png" alt={footer.brand} className="h-[22px] w-auto opacity-80 select-none" draggable="false" />
        </Link>
        <span className="normal-case tracking-normal text-white/30">{footer.tagline}</span>
        <div className="flex items-center gap-6">
          <span>{footer.location}</span>
          <button type="button" onClick={scrollTop} className="hover:text-white transition-colors duration-200">
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
