import { useState } from 'react';
import { motion } from 'framer-motion';
import { contact } from '../data.js';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const initialForm = { name: '', business: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: new Date().toISOString(),
          name: form.name,
          clientId: form.business,
          phone: form.phone,
          note: form.message,
          source: 'website-form',
        }),
      });
      const data = await res.json();
      if (data && data.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="bg-paper text-ink py-28 md:py-36">
      <div className="section-wrap grid md:grid-cols-12 gap-12 md:gap-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="md:col-span-5"
        >
          <p className="font-display text-[13px] tracking-[0.16em] uppercase text-gold-deep mb-5">
            {contact.eyebrow}
          </p>
          <h2 className="font-display font-semibold text-[34px] md:text-[42px] leading-[1.08] tracking-tight max-w-[14ch]">
            {contact.heading}
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-ink/60 max-w-[42ch]">{contact.sub}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="md:col-span-7"
        >
          {status === 'success' ? (
            <div className="rounded-2xl border border-paper-line bg-white p-10 text-center">
              <div className="mx-auto mb-4 w-11 h-11 rounded-full bg-gold/15 grid place-items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#2E3FA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-[19px] mb-1.5">Message sent.</h3>
              <p className="text-[14.5px] text-ink/55">
                Thanks — we'll be in touch shortly with your free demo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-paper-line bg-white p-8 sm:p-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your name" required>
                  <input
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Jad Bahous"
                    className="field"
                  />
                </Field>
                <Field label="Business name">
                  <input
                    value={form.business}
                    onChange={update('business')}
                    placeholder="Your business"
                    className="field"
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Phone / WhatsApp" required>
                  <input
                    required
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+974 ..."
                    className="field"
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="What do you need?">
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us a little about your business"
                    rows={4}
                    className="field resize-none"
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-7 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-ink text-white text-[14.5px] font-medium px-7 py-3.5 hover:bg-gold-deep transition-colors duration-200 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending…' : 'Get my free demo'}
              </button>

              {status === 'error' && (
                <p className="mt-4 text-[13.5px] text-red-600">
                  Something went wrong — please try again in a moment.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        .field {
          width: 100%;
          border: 1px solid #E7E5E2;
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14.5px;
          font-family: 'DM Sans', sans-serif;
          background: #FAFAF8;
          transition: border-color 150ms ease;
        }
        .field:focus {
          outline: none;
          border-color: #2E3FA8;
          background: #fff;
        }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium text-ink/70 mb-1.5">
        {label} {required && <span className="text-gold-deep">*</span>}
      </span>
      {children}
    </label>
  );
}
