import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { contact } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

const initialForm = { name: '', business: '', type: '', phone: '', email: '', website: '', message: '' };

// The beginning of a consultation, not a contact form: what happens next
// on the left, a short form on the right, WhatsApp and email as side doors.
export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function openChat() {
    window.dispatchEvent(new CustomEvent('marhab:open-chat'));
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
          name: form.name,
          clientId: form.business,
          businessType: form.type,
          phone: form.phone,
          email: form.email,
          website: form.website,
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
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="bg-ink text-white pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="section-wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={contact.eyebrow} heading={contact.heading} sub={contact.sub} max="15ch" subMax="42ch" />

          <motion.ol
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 border-t border-white/10"
          >
            {contact.next.map((n, i) => (
              <li key={n.title} className="grid grid-cols-[auto_1fr] gap-5 py-5 border-b border-white/10">
                <span className="font-display text-[13px] tabular-nums text-white/45 pt-1">0{i + 1}</span>
                <span>
                  <span className="block text-[15.5px] font-medium text-white">{n.title}</span>
                  <span className="block mt-1 text-[14px] leading-relaxed text-white/65">{n.text}</span>
                </span>
              </li>
            ))}
          </motion.ol>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8 flex flex-wrap gap-3"
          >
            {contact.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] text-white text-[14px] font-medium px-5 h-[44px] hover:border-white/50 hover:bg-white/[0.07] active:scale-[0.98] transition-[border-color,background-color,transform] duration-300"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
                WhatsApp us
              </a>
            )}
            <button
              type="button"
              onClick={openChat}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] text-white text-[14px] font-medium px-5 h-[44px] hover:border-white/50 hover:bg-white/[0.07] active:scale-[0.98] transition-[border-color,background-color,transform] duration-300"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
              Talk to Marhab now
            </button>
            {contact.phone && (
              <a
                href={`tel:+${contact.whatsapp}`}
                className="inline-flex items-center gap-2 rounded-full text-white/70 text-[14px] px-2 h-[44px] hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4 h-4" strokeWidth={1.8} />
                {contact.phone}
              </a>
            )}
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full text-white/70 text-[14px] px-2 h-[44px] hover:text-white transition-colors duration-200"
            >
              <Mail className="w-4 h-4" strokeWidth={1.8} />
              {contact.email}
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewportOnce} className="lg:col-span-7">
          {status === 'success' ? (
            <div className="rounded-2xl border border-line bg-panel p-10 md:p-14 text-center">
              <div className="mx-auto mb-5 w-11 h-11 rounded-full bg-white/10 grid place-items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-[22px] mb-2 text-white">Thank you — we’ll be in touch.</h3>
              <p className="text-[15px] text-white/65 max-w-[38ch] mx-auto">
                Jad will reply within one business day to arrange your free demo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-panel p-7 sm:p-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your name" required>
                  <input required value={form.name} onChange={update('name')} placeholder="Full name" className="field" autoComplete="name" />
                </Field>
                <Field label="Business name">
                  <input value={form.business} onChange={update('business')} placeholder="Your business" className="field" autoComplete="organization" />
                </Field>
                <Field label="Business type">
                  <select value={form.type} onChange={update('type')} className="field field-select">
                    <option value="">Select…</option>
                    {contact.businessTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Phone / WhatsApp" required>
                  <input required value={form.phone} onChange={update('phone')} placeholder="+974 …" className="field" autoComplete="tel" inputMode="tel" />
                </Field>
                <Field label="Email">
                  <input type="email" value={form.email} onChange={update('email')} placeholder="you@business.com" className="field" autoComplete="email" />
                </Field>
                <Field label="Website or Instagram">
                  <input value={form.website} onChange={update('website')} placeholder="Optional" className="field" />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="What would you like to improve?">
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Where do customers reach you today, and what gets missed?"
                    rows={4}
                    className="field resize-none"
                  />
                </Field>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf] text-black border border-white text-[14.5px] font-medium px-7 h-[50px] hover:shadow-[0_0_22px_rgba(186,208,255,0.3)] active:scale-[0.98] transition-[box-shadow,transform] duration-300 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending…' : contact.cta}
                  {status !== 'loading' && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
                </button>
                <p className="text-[13.5px] text-white/55">No obligation. We reply within one business day.</p>
              </div>

              {status === 'error' && (
                <p className="mt-4 text-[14px] text-red-400">
                  Something went wrong — please try again, or email {contact.email}.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        .field {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14.5px;
          font-family: 'Inter', system-ui, sans-serif;
          background: rgba(255,255,255,0.04);
          color: #ffffff;
          transition: border-color 150ms ease, background-color 150ms ease;
        }
        .field::placeholder { color: rgba(255,255,255,0.35); }
        .field:focus {
          outline: none;
          border-color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.07);
        }
        .field-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='rgba(255,255,255,0.5)' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }
        .field-select option { background: #0d0d0d; color: #fff; }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-[13.5px] font-medium text-white/70 mb-1.5">
        {label} {required && <span className="text-white">*</span>}
      </span>
      {children}
    </label>
  );
}
