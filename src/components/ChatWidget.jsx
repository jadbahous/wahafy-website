import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, X } from 'lucide-react';
import ChatBooking from './ChatBooking.jsx';

// The on-site concierge. It is both a feature and the demo: a visitor talking
// to it is seeing exactly what their own customers would get. Black sheet,
// hairline borders, white user bubbles — the same material as the rest of
// the site, nothing that reads as a third-party plugin.

const STORE_KEY = 'marhab:chat';
const GREETING =
  "Marhaba — I'm the Marhab assistant. Ask me anything about what we build, or tell me about your business and I'll set up a free demo.";
const SUGGESTIONS = [
  'What does Marhab AI do?',
  'Standard vs. Premium?',
  'How much does it cost?',
  'I run a restaurant in Doha',
];

function loadHistory() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null');
    if (Array.isArray(saved) && saved.length) return saved;
  } catch {}
  return [{ role: 'assistant', content: GREETING }];
}

export default function ChatWidget() {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [unread, setUnread] = useState(true);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    setUnread(false);
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [open, messages, busy]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    // Any "Try it yourself" / "Talk to Marhab" button on the site opens the panel.
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('marhab:open-chat', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('marhab:open-chat', onOpen);
    };
  }, []);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput('');
    setError(false);
    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.reply) throw new Error(data.error || 'bad response');
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
      if (data.leadCaptured) setCaptured(true);
      if (data.showCalendar) setShowBooking(true);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  const showSuggestions = messages.length <= 1 && !busy;

  const panelMotion = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { opacity: 0, y: 18, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
        transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <div className="mw-root">
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            {...panelMotion}
            role="dialog"
            aria-label="Chat with Marhab"
            className="mw-panel fixed z-[80] right-4 bottom-[88px] sm:right-6 sm:bottom-[92px] w-[calc(100vw-32px)] sm:w-[380px] h-[min(600px,calc(100dvh-120px))] flex flex-col overflow-hidden rounded-[20px] border border-white/[0.12] bg-[#0a0a0a] text-white origin-bottom-right"
          >
            <div className="noise-overlay" />

            {/* Header */}
            <header className="relative flex items-center justify-between gap-4 px-5 pt-[18px] pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="relative grid place-items-center w-9 h-9 rounded-full border border-white/[0.14] bg-white/[0.04]">
                  <img src="/brand/mark-white.png" alt="" className="h-[18px] w-auto select-none" draggable="false" />
                  <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-[#5ad88a] ring-2 ring-[#0a0a0a]" />
                </div>
                <div>
                  <p className="text-[14px] font-medium leading-tight">Marhab</p>
                  <p className="text-[12px] tracking-[0.04em] text-white/60 mt-0.5">AI assistant · replies in seconds</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid place-items-center w-8 h-8 rounded-full text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors duration-200"
              >
                <X className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </header>

            {/* Messages */}
            <div ref={listRef} className="mw-list relative flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[84%] px-[14px] py-[10px] text-[14px] leading-[1.55] whitespace-pre-wrap break-words ${
                      m.role === 'user'
                        ? 'bg-white text-black rounded-[16px] rounded-br-[5px]'
                        : 'bg-white/[0.06] border border-white/[0.07] text-white/85 rounded-[16px] rounded-bl-[5px]'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {showBooking && (
                <div className="flex justify-start">
                  <ChatBooking
                    onLayoutChange={() => {
                      const el = listRef.current;
                      if (el) el.scrollTop = el.scrollHeight;
                    }}
                  />
                </div>
              )}

              {captured && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#5ad88a]/30 bg-[#5ad88a]/10 text-[12.5px] text-[#9fe7bb]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5ad88a]" />
                    Saved — Jad has your details
                  </div>
                </div>
              )}

              {busy && (
                <div className="flex justify-start">
                  <div className="mw-dots px-[14px] py-[12px] bg-white/[0.06] border border-white/[0.07] rounded-[16px] rounded-bl-[5px]">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              {error && (
                <p className="text-[13px] text-white/60 px-1">
                  Couldn’t reach the assistant just now.{' '}
                  <button type="button" onClick={() => send(messages[messages.length - 1]?.content)} className="underline hover:text-white">
                    Try again
                  </button>
                </p>
              )}

              {showSuggestions && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="px-3 py-1.5 rounded-full border border-white/[0.16] bg-transparent text-[13.5px] text-white/70 hover:text-white hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98] transition-[color,border-color,background-color,transform] duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="relative flex items-center gap-2 px-3 py-3 border-t border-white/[0.08] bg-[#0a0a0a]"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your business…"
                autoComplete="off"
                className="flex-1 h-[42px] rounded-full border border-white/[0.14] bg-white/[0.04] px-4 text-[14px] text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/[0.06] transition-[border-color,background-color] duration-150"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="grid place-items-center w-[42px] h-[42px] rounded-full bg-white text-black disabled:opacity-35 disabled:cursor-default hover:shadow-[0_0_18px_rgba(200,214,255,0.35)] active:scale-95 transition-[opacity,box-shadow,transform] duration-200"
              >
                <ArrowUp className="w-[18px] h-[18px]" strokeWidth={2} />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Chat with Marhab'}
        className="mw-launch fixed z-[80] right-4 bottom-4 sm:right-6 sm:bottom-6 inline-flex items-center gap-2.5 h-[46px] pl-[14px] pr-[18px] rounded-full border border-white/25 bg-black/70 backdrop-blur-md text-white text-[14px] font-medium hover:border-white/55 hover:bg-white/[0.08] hover:shadow-[0_0_22px_rgba(170,200,255,0.2)] active:scale-[0.98] transition-[border-color,background-color,box-shadow,transform] duration-300"
      >
        <span className="relative inline-flex w-2 h-2 rounded-full bg-[#5ad88a]">
          {unread && !open && <span className="absolute inset-0 rounded-full bg-[#5ad88a] animate-ping" />}
        </span>
        {open ? 'Close' : 'Ask Marhab'}
      </button>

      <style>{`
        .mw-panel {
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03),
            0 30px 80px rgba(0,0,0,0.65),
            0 8px 24px rgba(0,0,0,0.45);
        }
        .mw-list { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) transparent; }
        .mw-list::-webkit-scrollbar { width: 6px; }
        .mw-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 999px; }
        .mw-dots { display: inline-flex; gap: 4px; }
        .mw-dots span {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.7); opacity: 0.3;
          animation: mwBlink 1.1s infinite ease-in-out;
        }
        .mw-dots span:nth-child(2) { animation-delay: 0.15s; }
        .mw-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes mwBlink { 0%, 80%, 100% { opacity: 0.25; } 40% { opacity: 0.9; } }
        body.menu-open .mw-root { opacity: 0; pointer-events: none; }
        .mw-root { transition: opacity 0.2s ease; }
        .mw-launch:focus-visible, .mw-panel button:focus-visible, .mw-panel input:focus-visible {
          outline: 2px solid rgba(255,255,255,0.7); outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
