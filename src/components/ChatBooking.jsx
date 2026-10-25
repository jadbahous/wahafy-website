import { useEffect, useState } from 'react';

// Inline booking card rendered inside the chat message list once the
// assistant offers a call time. Same black-sheet material as the rest of
// the widget — day/slot picker, then a two-field form, then confirmation.
// Fully self-contained: fetches availability itself and posts the booking.

export default function ChatBooking({ onLayoutChange }) {
  const [step, setStep] = useState('loading'); // loading | error | slots | form | success
  const [days, setDays] = useState([]);
  const [slot, setSlot] = useState(null);
  const [dateLabel, setDateLabel] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    onLayoutChange?.();
  }, [step, days, formError, onLayoutChange]);

  useEffect(() => {
    loadAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAvailability() {
    setStep('loading');
    try {
      const res = await fetch('/api/availability?days=10');
      const data = await res.json();
      if (!res.ok || !data.ok || !Array.isArray(data.days) || data.days.length === 0) {
        setStep('error');
        return;
      }
      setDays(data.days);
      setStep('slots');
    } catch {
      setStep('error');
    }
  }

  function pickSlot(s, label) {
    setSlot(s);
    setDateLabel(label);
    setFormError('');
    setStep('form');
  }

  async function confirmBooking() {
    if (!name.trim() || !phone.trim()) {
      setFormError('Please add your name and phone number.');
      return;
    }
    setFormError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: slot.start,
          end: slot.end,
          name: name.trim(),
          phone: phone.trim(),
          note: 'Free 20-minute call booked via chat',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFormError(data?.error || "That time isn't available anymore. Please pick another.");
        setSubmitting(false);
        if (data && /taken|no longer available/i.test(data.error || '')) {
          loadAvailability();
        }
        return;
      }
      setStep('success');
    } catch {
      setFormError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-[92%] rounded-[16px] border border-fg/[0.07] bg-fg/[0.06] p-4">
      {step === 'loading' && <p className="text-[13.5px] text-fg/60">Loading available times…</p>}

      {step === 'error' && (
        <div>
          <p className="text-[13.5px] text-fg/60 mb-3">Couldn’t load times just now.</p>
          <button
            type="button"
            onClick={loadAvailability}
            className="inline-flex items-center rounded-full bg-fg text-bg text-[13px] font-medium px-4 h-[34px] hover:shadow-[0_0_16px_rgba(200,214,255,0.3)] active:scale-[0.98] transition-[box-shadow,transform] duration-200"
          >
            Try again
          </button>
        </div>
      )}

      {step === 'slots' && (
        <div>
          <p className="text-[13.5px] font-medium text-fg mb-3">Pick a free 20-minute call time</p>
          <div className="flex flex-col gap-3 max-h-[280px] overflow-y-auto pr-1">
            {days.map((day) => (
              <div key={day.date}>
                <p className="text-[10.5px] font-semibold tracking-[0.08em] uppercase text-fg/45 mb-1.5">
                  {day.dateLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {day.slots.map((s) => (
                    <button
                      key={s.start}
                      type="button"
                      disabled={!s.available}
                      onClick={() => pickSlot(s, day.dateLabel)}
                      className={
                        s.available
                          ? 'rounded-[8px] border border-fg/[0.16] bg-transparent text-fg/85 text-[12px] px-2.5 h-[30px] hover:border-fg/45 hover:bg-fg/[0.05] active:scale-[0.97] transition-[border-color,background-color,transform] duration-150'
                          : 'rounded-[8px] border border-fg/[0.06] bg-transparent text-fg/25 text-[12px] px-2.5 h-[30px] line-through cursor-default'
                      }
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'form' && slot && (
        <div>
          <p className="text-[13.5px] font-medium text-fg mb-3">
            {dateLabel} at {slot.label}
          </p>
          <div className="flex flex-col gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              className="h-[38px] rounded-[8px] border border-fg/[0.14] bg-fg/[0.04] px-3 text-[13.5px] text-fg placeholder:text-fg/40 focus:outline-none focus:border-fg/45 transition-colors duration-150"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="WhatsApp number"
              autoComplete="tel"
              inputMode="tel"
              className="h-[38px] rounded-[8px] border border-fg/[0.14] bg-fg/[0.04] px-3 text-[13.5px] text-fg placeholder:text-fg/40 focus:outline-none focus:border-fg/45 transition-colors duration-150"
            />
          </div>
          {formError && <p className="text-[12px] text-red-400 mt-2">{formError}</p>}
          <div className="flex items-center gap-4 mt-3">
            <button
              type="button"
              disabled={submitting}
              onClick={confirmBooking}
              className="inline-flex items-center rounded-full bg-fg text-bg text-[13px] font-medium px-4 h-[34px] hover:shadow-[0_0_16px_rgba(200,214,255,0.3)] active:scale-[0.98] transition-[box-shadow,transform] duration-200 disabled:opacity-50"
            >
              {submitting ? 'Booking…' : 'Confirm'}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormError('');
                loadAvailability();
              }}
              className="text-[12px] text-fg/55 underline hover:text-fg/80 transition-colors duration-150"
            >
              Choose another time
            </button>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div>
          <p className="text-[13.5px] font-medium text-fg mb-1">
            Booked for {dateLabel} at {slot.label}
          </p>
          <p className="text-[12.5px] text-fg/60">Jad will call you then. He has your number if anything changes.</p>
        </div>
      )}
    </div>
  );
}
