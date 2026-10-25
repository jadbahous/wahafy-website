import { Check } from 'lucide-react';

// Small "real interface" pieces used in the demo, the work case studies and
// the previews. They are drawn in the same material as the site (raised
// panels, hairlines, the customer's bubbles in ink) so they read as product,
// not illustration. Depth comes from the shadow ladder in index.css.

function themedMark() {
  const dark = document.documentElement.dataset.theme !== 'daylight';
  return dark ? '/brand/mark-white.png' : '/brand/mark-dark.png';
}

export function Panel({ title, sub, children, className = '', level = 3 }) {
  return (
    <div
      className={`relative rounded-[22px] bg-panel overflow-hidden ${className}`}
      style={{ boxShadow: `var(--shadow-${level})` }}
    >
      {title && (
        <div className="flex items-center gap-3 px-5 py-4 border-b border-fg/[0.08]">
          <div className="relative grid place-items-center w-8 h-8 rounded-full border border-fg/[0.14] bg-fg/[0.04]">
            <img src={themedMark()} alt="" className="h-[15px] w-auto select-none" draggable="false" />
            <span className="absolute -right-0.5 -bottom-0.5 w-2 h-2 rounded-full bg-ok-dot ring-2 ring-panel" />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-medium leading-tight text-fg truncate">{title}</p>
            {sub && <p className="text-[12px] tracking-[0.04em] text-fg/65 mt-0.5">{sub}</p>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export function Bubble({ role, children, className = '' }) {
  const me = role === 'customer';
  return (
    <div className={`flex ${me ? 'justify-end' : 'justify-start'} ${className}`}>
      <div
        className={`max-w-[84%] px-[14px] py-[10px] text-[14px] leading-[1.5] ${
          me
            ? 'bg-fg text-bg rounded-[16px] rounded-br-[5px]'
            : 'bg-fg/[0.06] border border-fg/[0.07] text-fg/90 rounded-[16px] rounded-bl-[5px]'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="mock-dots px-[14px] py-[12px] bg-fg/[0.06] border border-fg/[0.07] rounded-[16px] rounded-bl-[5px]">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export function StatusRow({ label, detail, state = 'idle' }) {
  // state: idle | active | done
  return (
    <div className="flex items-center gap-3.5 py-3">
      <span
        className={`grid place-items-center w-6 h-6 rounded-full border transition-[background-color,border-color] duration-300 ${
          state === 'done'
            ? 'bg-fg border-fg text-bg'
            : state === 'active'
            ? 'border-fg/60 text-fg'
            : 'border-fg/15 text-transparent'
        }`}
      >
        {state === 'done' ? (
          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
        ) : (
          <span className={`w-1.5 h-1.5 rounded-full ${state === 'active' ? 'bg-fg animate-pulse' : 'bg-fg/15'}`} />
        )}
      </span>
      <div className="flex-1 flex items-baseline justify-between gap-4 min-w-0">
        <span className={`text-[14px] transition-colors duration-300 ${state === 'idle' ? 'text-fg/60' : 'text-fg'}`}>
          {label}
        </span>
        <span className={`text-[13px] tabular-nums truncate transition-colors duration-300 ${state === 'idle' ? 'text-fg/30' : 'text-fg/65'}`}>
          {detail}
        </span>
      </div>
    </div>
  );
}

export function BookingCard({ title, line1, line2, className = '' }) {
  return (
    <div className={`rounded-[16px] bg-panel p-4 ${className}`} style={{ boxShadow: 'var(--shadow-2)' }}>
      <div className="flex items-center gap-2.5">
        <span className="grid place-items-center w-6 h-6 rounded-full bg-ok-dot/15 border border-ok-dot/40">
          <Check className="w-3.5 h-3.5 text-ok" strokeWidth={2.5} />
        </span>
        <p className="text-[14px] font-medium text-fg">{title}</p>
      </div>
      <div className="mt-3 pt-3 border-t border-fg/[0.08] text-[13.5px] leading-relaxed">
        <p className="text-fg/85">{line1}</p>
        <p className="text-fg/60">{line2}</p>
      </div>
    </div>
  );
}

export function BrowserFrame({ src, alt, className = '' }) {
  return (
    <div className={`rounded-[14px] bg-panel overflow-hidden ${className}`} style={{ boxShadow: 'var(--shadow-2)' }}>
      <div className="flex items-center gap-1.5 px-3 h-8 border-b border-fg/[0.08]">
        <span className="w-2 h-2 rounded-full bg-fg/15" />
        <span className="w-2 h-2 rounded-full bg-fg/15" />
        <span className="w-2 h-2 rounded-full bg-fg/15" />
        <span className="ml-3 h-4 flex-1 max-w-[220px] rounded-full bg-fg/[0.05]" />
      </div>
      <div className="relative aspect-[16/10] bg-gradient-to-br from-[#1b1d2b] to-[#0b0c14]">
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-bg/10 to-transparent" />
      </div>
    </div>
  );
}

export function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`rounded-[26px] bg-panel p-2 ${className}`} style={{ boxShadow: 'var(--shadow-3)' }}>
      <div className="rounded-[20px] bg-bg overflow-hidden">
        <div className="flex justify-center pt-2 pb-1">
          <span className="w-16 h-1.5 rounded-full bg-fg/10" />
        </div>
        {children}
      </div>
    </div>
  );
}
