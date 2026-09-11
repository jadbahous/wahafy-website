import { Link } from 'react-router-dom';
import { footer } from '../data.js';

export default function Footer() {
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="bg-ink text-white/50 py-10">
      <div className="section-wrap flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px]">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid place-items-center w-6 h-6 rounded-md bg-gold text-white font-display font-bold text-[11px]">
            W
          </span>
          <span className="text-white/70">{footer.brand}</span>
          <span className="text-white/30">— {footer.tagline}</span>
        </Link>
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
