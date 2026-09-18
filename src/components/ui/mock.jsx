import { Check } from 'lucide-react';

// Small "real interface" pieces used in the demo, the work case studies and
// the previews. They are drawn in the same material as the site — black
// panels, hairline borders, white customer bubbles — so they read as product,
// not illustration.

export function Panel({ title, sub, children, className = '' }) {
  return (
    <div
      className={`relative rounded-[22px] border border-white/[0.12] bg-[#0b0b0b] overflow-hidden ${className}`}
      style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 30px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)' }}
    >
      {title && (
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08]">
          <div className="relative grid place-items-center w-8 h-8 rounded-full border border-white/[0.14] bg-white/[0.04]">
            <img src="/brand/mark-white.png" alt="" className="h-[15px] w-auto select-none" draggable="false" />
            <span className="absolute -right-0.5 -bottom-0.5 w-2 h-2 rounded-full bg-[#5ad88a] ring-2 ring-[#0b0b0b]" />
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-medium leading-tight text-white truncate">{title}</p>
            {sub && <p className="text-[12px] tracking-[0.04em] text-white/60 mt-0.5">{sub}</p>}
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
            ? 'bg-white text-black rounded-[16px] rounded-br-[5px]'
            : 'bg-white/[0.06] border border-white/[0.07] text-white/85 rounded-[16px] rounded-bl-[5px]'
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
      <div className="mock-dots px-[14px] py-[12px] bg-white/[0.06] border border-white/[0.07] rounded-[16px] rounded-bl-[5px]">
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
            ? 'bg-white border-white text-black'
            : state === 'active'
            ? 'border-white/60 text-white'
            : 'border-white/15 text-transparent'
        }`}
      >
        {state === 'done' ? (
          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
        ) : (
          <span className={`w-1.5 h-1.5 rounded-full ${state === 'active' ? 'bg-white animate-pulse' : 'bg-white/15'}`} />
        )}
      </span>
      <div className="flex-1 flex items-baseline justify-between gap-4 min-w-0">
        <span className={`text-[14px] transition-colors duration-300 ${state === 'idle' ? 'text-white/50' : 'text-white'}`}>
          {label}
        </span>
        <span className={`text-[13px] tabular-nums truncate transition-colors duration-300 ${state === 'idle' ? 'text-white/20' : 'text-white/60'}`}>
          {detail}
        </span>
      </div>
    </div>
  );
}

export function BookingCard({ title, line1, line2, className = '' }) {
  return (
    <div className={`rounded-[16px] border border-white/[0.12] bg-[#0b0b0b] p-4 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span className="grid place-items-center w-6 h-6 rounded-full bg-[#5ad88a]/15 border border-[#5ad88a]/30">
          <Check className="w-3.5 h-3.5 text-[#9fe7bb]" strokeWidth={2.5} />
        </span>
        <p className="text-[14px] font-medium text-white">{title}</p>
      </div>
      <div className="mt-3 pt-3 border-t border-white/[0.08] text-[13.5px] leading-relaxed">
        <p className="text-white/80">{line1}</p>
        <p className="text-white/55">{line2}</p>
      </div>
    </div>
  );
}

export function BrowserFrame({ src, alt, className = '' }) {
  return (
    <div className={`rounded-[14px] border border-white/[0.12] bg-[#0b0b0b] overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 px-3 h-8 border-b border-white/[0.08]">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="ml-3 h-4 flex-1 max-w-[220px] rounded-full bg-white/[0.05]" />
      </div>
      <div className="relative aspect-[16/10] bg-[#111]">
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>
    </div>
  );
}

export function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`rounded-[26px] border border-white/[0.14] bg-[#0b0b0b] p-2 ${className}`} style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }}>
      <div className="rounded-[20px] bg-black overflow-hidden">
        <div className="flex justify-center pt-2 pb-1">
          <span className="w-16 h-1.5 rounded-full bg-white/10" />
        </div>
        {children}
      </div>
    </div>
  );
}
