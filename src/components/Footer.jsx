import { Link } from 'react-router-dom';
import { footer } from '../data.js';

export default function Footer() {
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="bg-bg text-fg/65 pt-8 pb-24 sm:pb-8 border-t border-fg/10">
      {/* The chat launcher floats bottom-right; the row keeps clear of it. */}
      <div className="section-wrap flex flex-col sm:flex-row items-center justify-between gap-4 sm:pr-[160px] font-display text-[12px] font-medium uppercase tracking-[0.14em]">
        <Link to="/" className="flex items-center normal-case tracking-normal" aria-label={footer.brand}>
          <img src={document.documentElement.dataset.theme === "daylight" ? "/brand/lockup-dark.png" : "/brand/lockup-white.png"} alt={footer.brand} className="h-[22px] w-auto opacity-80 select-none" draggable="false" />
        </Link>
        <span className="font-body normal-case tracking-normal text-[13px] font-normal text-fg/60">{footer.tagline}</span>
        <div className="flex items-center gap-6">
          <span>{footer.location}</span>
          <button type="button" onClick={scrollTop} className="rounded-sm hover:text-fg transition-colors duration-200">
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
