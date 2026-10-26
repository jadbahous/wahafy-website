import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle, Phone } from 'lucide-react';
import { useCopy } from '../i18n.jsx';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

const initialForm = { name: '', business: '', type: '', phone: '', email: '', website: '', message: '' };

// The beginning of a consultation, not a contact form: what happens next
// on the left, a short form on the right, WhatsApp and email as side doors.
export default function Contact() {
  const { contact } = useCopy();
  const f = contact.form;
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
    <section id="contact" className="bg-bg text-fg pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="section-wrap grid lg:grid-cols-12 gap-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={contact.eyebrow} heading={contact.heading} sub={contact.sub} max="15ch" subMax="42ch" />

          <motion.ol
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 border-t border-fg/10"
          >
            {contact.next.map((n, i) => (
              <li key={n.title} className="grid grid-cols-[auto_1fr] gap-5 py-5 border-b border-fg/10">
                <span className="font-display text-[13.5px] font-medium tabular-nums text-fg/60 pt-1">0{i + 1}</span>
                <span>
                  <span className="block text-[16px] font-medium text-fg">{n.title}</span>
                  <span className="block mt-1 text-[14.5px] leading-relaxed text-fg/70">{n.text}</span>
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
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-secondary h-[46px] px-5 text-[14px]">
                <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
                {f.whatsappUs}
              </a>
            )}
            <button type="button" onClick={openChat} className="btn-secondary h-[46px] px-5 text-[14px]">
              <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
              {f.talk}
            </button>
            {contact.phone && (
              <a
                href={`tel:+${contact.whatsapp}`}
                className="inline-flex items-center gap-2 rounded-full text-fg/75 text-[14px] px-2 h-[46px] hover:text-fg transition-colors duration-200"
              >
                <Phone className="w-4 h-4" strokeWidth={1.8} />
                {contact.phone}
              </a>
            )}
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full text-fg/75 text-[14px] px-2 h-[46px] hover:text-fg transition-colors duration-200"
            >
              <Mail className="w-4 h-4" strokeWidth={1.8} />
              {contact.email}
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={viewportOnce} className="lg:col-span-7">
          {status === 'success' ? (
            <div className="rounded-[22px] surface-2 p-10 md:p-14 text-center">
              <div className="mx-auto mb-5 w-11 h-11 rounded-full bg-fg/10 grid place-items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="rgb(var(--fg))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display font-semibold text-[22px] mb-2 text-fg">{f.successTitle}</h3>
              <p className="text-[15.5px] text-fg/70 max-w-[38ch] mx-auto">{f.successText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[22px] surface-2 p-7 sm:p-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={f.name} required>
                  <input required value={form.name} onChange={update('name')} placeholder={f.namePlaceholder} className="field" autoComplete="name" />
                </Field>
                <Field label={f.business}>
                  <input value={form.business} onChange={update('business')} placeholder={f.businessPlaceholder} className="field" autoComplete="organization" />
                </Field>
                <Field label={f.type}>
                  <select value={form.type} onChange={update('type')} className="field field-select">
                    <option value="">{f.typePlaceholder}</option>
                    {contact.businessTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label={f.phone} required>
                  <input required value={form.phone} onChange={update('phone')} placeholder={f.phonePlaceholder} className="field" autoComplete="tel" inputMode="tel" dir="ltr" />
                </Field>
                <Field label={f.email}>
                  <input type="email" value={form.email} onChange={update('email')} placeholder={f.emailPlaceholder} className="field" autoComplete="email" dir="ltr" />
                </Field>
                <Field label={f.website}>
                  <input value={form.website} onChange={update('website')} placeholder={f.websitePlaceholder} className="field" />
                </Field>
              </div>

              <div className="mt-5">
                <Field label={f.message}>
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    placeholder={f.messagePlaceholder}
                    rows={4}
                    className="field resize-none"
                  />
                </Field>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                <button type="submit" disabled={status === 'loading'} className="btn-primary group h-[50px] px-7 text-[14.5px]">
                  {status === 'loading' ? f.sending : contact.cta}
                  {status !== 'loading' && <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" strokeWidth={2} />}
                </button>
                <p className="text-[14px] text-fg/65">{f.note}</p>
              </div>

              {status === 'error' && (
                <p className="mt-4 text-[14px] text-danger" role="alert">
                  {f.error} {contact.email}.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        .field {
          width: 100%;
          border: 1px solid rgb(var(--fg) / 0.14);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 15px;
          font-family: inherit;
          background: rgb(var(--fg) / 0.035);
          color: rgb(var(--fg));
          transition: border-color 180ms cubic-bezier(0.32, 0.72, 0, 1), background-color 180ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 180ms cubic-bezier(0.32, 0.72, 0, 1);
        }
        .field::placeholder { color: rgb(var(--fg) / 0.45); }
        .field:hover { border-color: rgb(var(--fg) / 0.26); }
        .field:focus {
          outline: none;
          border-color: rgb(var(--fg) / 0.6);
          background: rgb(var(--panel));
          box-shadow: 0 0 0 3px rgb(var(--fg) / 0.08);
        }
        .field-select {
          appearance: none;
          background-image: linear-gradient(45deg, transparent 50%, rgb(var(--fg) / 0.6) 50%), linear-gradient(135deg, rgb(var(--fg) / 0.6) 50%, transparent 50%);
          background-size: 5px 5px, 5px 5px;
          background-position: right 20px center, right 15px center;
        }
        [dir='rtl'] .field-select {
          background-position: left 15px center, left 20px center;
          padding-right: 14px;
          padding-left: 40px;
          background-repeat: no-repeat;
          padding-right: 40px;
        }
        .field-select option { background: rgb(var(--panel)); color: rgb(var(--fg)); }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-[13.5px] font-medium text-fg/80 mb-1.5">
        {label} {required && <span className="text-fg">*</span>}
      </span>
      {children}
    </label>
  );
}
